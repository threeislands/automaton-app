from flaskr.model.test_result import TestResult


def test_test_automaton(client):
    rv = client.post('test/automaton/{}'.format(question_id), json=req_data)
    res_data = rv.get_json()

    assert_test_result(res_data, expected_result_list)


def test_test_automaton_by_authenticated_user(authenticated_client, authenticated_user,
                                              test_db_session):
    rv = authenticated_client.post('test/automaton/{}'.format(question_id), json=req_data)
    res_data = rv.get_json()

    assert_test_result(res_data, expected_result_list)

    test_result = test_db_session.query(TestResult).filter(
        TestResult.user_id == authenticated_user.id,
        TestResult.question_id == question_id,
    ).one()
    assert test_result.user_id == authenticated_user.id
    assert test_result.question_id == question_id
    assert test_result.passed is True


question_id = 1

req_data = {
    'states': [
        {'id': 'stateId_0', 'x': 60, 'y': 250, 'accept': False},
        {'id': 'stateId_1', 'x': 137, 'y': 165, 'accept': True},
        {'id': 'stateId_3', 'x': 232, 'y': 165, 'accept': False},
        {'id': 'stateId_8', 'x': 144, 'y': 326, 'accept': False}
    ],
    'transitions': [
        {'id': 'transitionId_2', 'fromStateId': 'stateId_0', 'toStateId': 'stateId_1', 'inputs': ['1']},
        {'id': 'transitionId_4', 'fromStateId': 'stateId_1', 'toStateId': 'stateId_3', 'inputs': ['2']},
        {'id': 'transitionId_5', 'fromStateId': 'stateId_1', 'toStateId': 'stateId_1', 'inputs': ['1']},
        {'id': 'transitionId_6', 'fromStateId': 'stateId_3', 'toStateId': 'stateId_3', 'inputs': ['2']},
        {'id': 'transitionId_7', 'fromStateId': 'stateId_3', 'toStateId': 'stateId_1', 'inputs': ['1']},
        {'id': 'transitionId_9', 'fromStateId': 'stateId_0', 'toStateId': 'stateId_8', 'inputs': ['2']},
        {'id': 'transitionId_10', 'fromStateId': 'stateId_8', 'toStateId': 'stateId_8', 'inputs': ['1', '2']}
    ],
}

expected_result_list = [
    {'sequenceId': 1, 'result': True, 'transitionOrderList': ['transitionId_2', 'transitionId_4', 'transitionId_7'],
     'stateOrderList': ['stateId_0', 'stateId_1', 'stateId_3', 'stateId_1']},
    {'sequenceId': 2, 'result': True, 'transitionOrderList': ['transitionId_2'],
     'stateOrderList': ['stateId_0', 'stateId_1']},
    {'sequenceId': 3, 'result': True,
     'transitionOrderList': ['transitionId_2', 'transitionId_5',
                             'transitionId_5', 'transitionId_5'],
     'stateOrderList': ['stateId_0', 'stateId_1', 'stateId_1',
                        'stateId_1', 'stateId_1']},
    {'sequenceId': 4, 'result': True,
     'transitionOrderList': ['transitionId_2', 'transitionId_4', 'transitionId_7', 'transitionId_4'],
     'stateOrderList': ['stateId_0', 'stateId_1', 'stateId_3', 'stateId_1', 'stateId_3']},
    {'sequenceId': 5, 'result': True,
     'transitionOrderList': ['transitionId_9', 'transitionId_10', 'transitionId_10', 'transitionId_10'],
     'stateOrderList': ['stateId_0', 'stateId_8', 'stateId_8', 'stateId_8', 'stateId_8']}
]


def assert_test_result(actual_list, expected_list):
    for index, sequence_result in enumerate(expected_list):
        actual_data = actual_list[index]
        assert actual_data['result'] == sequence_result['result']
        assert actual_data['stateOrderList'] == sequence_result['stateOrderList']
        assert actual_data['transitionOrderList'] == sequence_result['transitionOrderList']
