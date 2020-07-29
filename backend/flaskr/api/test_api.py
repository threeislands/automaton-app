from flask import (
    Blueprint, request, jsonify, session
)
from marshmallow import ValidationError

from flaskr.service.test_result_service import TestResultService
from flaskr.model.test_result import TestResult
from flaskr.model.sequence_result import SequenceResult
from flaskr.schema.automaton_schema import AutomatonSchema
from flaskr.schema.sequence_result_schema import SequenceResultSchema
from flaskr.service.question_service import QuestionService

bp = Blueprint('test', __name__, )  # url_prefix='/public')

START_STATE_ID = 'stateId_0'


@bp.route('/test/automaton/<question_id>', methods=['POST'])
def post_automaton(question_id):

    try:
        automaton = request.json
        automaton_data = AutomatonSchema().load(automaton)
    except ValidationError as e:
        raise

    sequences = QuestionService.find_sequences_by_question_id(question_id)
    states = automaton_data.states
    transitions = automaton_data.transitions

    sequence_result_list = []

    for seq in sequences:
        sequence_result = SequenceResult(sequence_id=seq.id, result=False)
        sequence_result.state_order_list.append(START_STATE_ID)
        sequence_result_list.append(sequence_result)

        current_state_id = START_STATE_ID

        try:
            for c in seq.value:
                # 遷移元の状態のIDと現在の状態のIDが同じで、現在の文字が遷移の入力のリストに含まれている遷移を取得
                match_transition = \
                    list(filter(lambda t: t.from_state_id == current_state_id and c in t.inputs, transitions))

                # 入力に対する遷移がない場合、誤り
                if len(match_transition) == 0:
                    raise Exception

                # 入力に対する遷移が複数ある場合、誤り
                if len(match_transition) > 1:
                    raise Exception

                current_state_id = match_transition[0].to_state_id
                sequence_result.state_order_list.append(current_state_id)
                sequence_result.transition_order_list.append(match_transition[0].id)

            finished_state = list(filter(lambda s: s.id == current_state_id, states))
            res = seq.accept == finished_state[0].accept
            sequence_result.result = res

        except Exception:
            pass

    if session.get('user_id') is not None:
        user_id = session.get('user_id')
        passed = all(r.result for r in sequence_result_list)
        if passed:
            test_result = TestResult(user_id=user_id, question_id=question_id,
                                     passed=passed)
            TestResultService.create(test_result)
            print(TestResult.query.all())

    schema = SequenceResultSchema()

    json = list(map(lambda sr: schema.dump(sr), sequence_result_list))

    return jsonify(json)
