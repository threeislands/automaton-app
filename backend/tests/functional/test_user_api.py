import json
from itertools import zip_longest

from flaskr.model.created_automaton import CreatedAutomaton
from flaskr.model.test_result import TestResult
from flaskr.service.automaton_service import AutomatonService


def test_get_current_user(authenticated_client, authenticated_user, test_db_session):
    test_result_list = [
        TestResult(user_id=1, question_id=1, passed=True),
        TestResult(user_id=1, question_id=2, passed=True)
    ]
    test_db_session.add_all(test_result_list)
    test_db_session.commit()

    rv = authenticated_client.get('/user/current_user')
    actual_user = rv.get_json()

    assert actual_user['id'] == authenticated_user.id
    assert actual_user['displayName'] == authenticated_user.display_name

    for act, exp in zip_longest(actual_user['testResultList'],
                                test_result_list):
        assert act['questionId'] == exp.question_id
        assert act['passed'] == exp.passed


def test_get_current_user_by_unauthenticated_user(client):
    rv = client.get('/user/current_user')

    assert rv.status_code == 401


test_automaton_data = {
    "count": 13,
    "states": [
        {"x": 54, "y": 252, "id": "stateId_0", "accept": False},
        {"x": 140, "y": 159, "id": "stateId_1", "accept": True},
        {"x": 238, "y": 160, "id": "stateId_3", "accept": False},
        {"x": 140, "y": 335, "id": "stateId_8", "accept": False}
    ],
    "transitions": [
        {"id": "transitionId_2", "inputs": ["1"], "toStateId": "stateId_1", "fromStateId": "stateId_0"},
        {"id": "transitionId_4", "inputs": ["2"], "toStateId": "stateId_3", "fromStateId": "stateId_1"},
        {"id": "transitionId_5", "inputs": ["1"], "toStateId": "stateId_1", "fromStateId": "stateId_3"},
        {"id": "transitionId_6", "inputs": ["1"], "toStateId": "stateId_1", "fromStateId": "stateId_1"},
        {"id": "transitionId_7", "inputs": ["2"], "toStateId": "stateId_3", "fromStateId": "stateId_3"},
        {"id": "transitionId_9", "inputs": ["2"], "toStateId": "stateId_8", "fromStateId": "stateId_0"},
        {"id": "transitionId_11", "inputs": ["1", "2"], "toStateId": "stateId_8", "fromStateId": "stateId_8"}
    ]
}


def test_load_automaton(authenticated_client, authenticated_user, test_db_session):
    question_id = 1
    created = CreatedAutomaton(user_id=authenticated_user.id, question_id=question_id,
                               automaton_data=test_automaton_data)
    test_db_session.add(created)
    test_db_session.commit()

    rv = authenticated_client.get('/user/load_automaton/{}'.format(question_id))
    res_data = rv.get_json()

    assert res_data['count'] == test_automaton_data['count']
    assert res_data['states'] == test_automaton_data['states']
    assert res_data['transitions'] == test_automaton_data['transitions']


def test_save_automaton(authenticated_client, authenticated_user):
    question_id = 2

    rv = authenticated_client.post('/user/save_automaton/{}'.format(question_id), json=test_automaton_data)

    created_automaton = AutomatonService.find_by_user_id_and_question_id(authenticated_user.id, question_id)

    assert rv.status_code == 200
    assert created_automaton.user_id == authenticated_user.id
    assert created_automaton.question_id == question_id
    assert created_automaton.automaton_data['count'] == test_automaton_data['count']
    assert created_automaton.automaton_data['states'] == test_automaton_data['states']
    assert created_automaton.automaton_data['transitions'] == test_automaton_data['transitions']
