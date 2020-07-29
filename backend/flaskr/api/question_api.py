from flask import (
    Blueprint, jsonify

)
from flaskr.schema.question_schema import QuestionSchema
from flaskr.service.question_service import QuestionService

bp = Blueprint('question', __name__, )


@bp.route('/question/<int:question_id>')
def get_question(question_id):
    question = QuestionService.find_by_id(question_id)
    data = QuestionSchema().dump(question)
    return jsonify(data)
