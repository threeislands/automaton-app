from itertools import zip_longest

from more_itertools import first_true

from flaskr.data.initial_data import questions
from flaskr.schema.question_schema import QuestionSchema


def test_get_question(client):

    question_id = 1
    rv = client.get('/question/{}'.format(question_id))

    expected = QuestionSchema().dump(
        first_true(questions, pred=lambda e: e.id == question_id))
    actual = rv.get_json()

    assert actual['id'] == expected['id']
    assert actual['allowInputs'] == expected['allowInputs']
    assert actual['questionText'] == expected['questionText']

    for act, exp in zip_longest(actual['sequences'], expected['sequences']):
        assert act['value'] == exp['value']
        assert act['accept'] == exp['accept']
