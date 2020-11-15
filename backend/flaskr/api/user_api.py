import json

from flask import (
    Blueprint, session, jsonify, make_response, request
)

from flaskr.model.created_automaton import CreatedAutomaton
from flaskr.schema.automaton_schema import AutomatonSchema
from flaskr.service.automaton_service import AutomatonService
from flaskr.libs.authentication_required import authentication_required
from flaskr.schema.client_user_schema import ClientUserSchema
from flaskr.service.user_service import UserService

bp = Blueprint('user', __name__, )  # url_prefix='/public')


@bp.route('/user/current_user', methods=['GET'])
def get_current_user():

    if session.get('user_id') is None:
        return make_response(jsonify({}))

    user_id = session.get('user_id')

    user = UserService.find_by_id(user_id)
    user_data = ClientUserSchema().dump(user)

    return make_response(jsonify(user_data))


@bp.route('/user/delete/current_user', methods=['POST'])
@authentication_required
def delete_current_user():
    user_id = session.get('user_id')
    UserService.delete_by_id(user_id)

    session.clear()
    return make_response(jsonify({'message': 'success'}))


@bp.route('/user/load_automaton/<int:question_id>', methods=['GET'])
@authentication_required
def load_automaton(question_id):
    user_id = session.get('user_id')

    automaton = AutomatonService.find_by_user_id_and_question_id(user_id, question_id)

    if automaton is None:
        return make_response(jsonify({})), 404

    return make_response(jsonify(automaton.automaton_data))


@bp.route('/user/save_automaton/<int:question_id>', methods=['POST'])
@authentication_required
def save_automaton(question_id):
    user_id = session.get('user_id')

    req_body = request.json
    schema = AutomatonSchema()
    automaton_data = schema.load(req_body)

    created_automaton = CreatedAutomaton(
        user_id=user_id, question_id=question_id,
        automaton_data=schema.dump(automaton_data))

    AutomatonService.create(created_automaton)

    return make_response(jsonify({'message': 'success'}))

