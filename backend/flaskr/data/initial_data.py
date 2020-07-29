from flaskr.model.sequence import Sequence
from flaskr.model.question import Question

questions = [
    Question(
        id=1, title='レベル１', question_text='1から始まり1で終わる文字列を受理する',
        allow_inputs=["1", "2"], sequences=[
            Sequence(value="121", accept=True, display_order=1),
            Sequence(value="1", accept=True, display_order=2),
            Sequence(value="1111", accept=True, display_order=3),
            Sequence(value="1212", accept=False, display_order=4),
            Sequence(value="2121", accept=False, display_order=5),
        ]),
    Question(
        id=2, title='レベル２', question_text='1から始まり1で終わる文字列を受理する',
        allow_inputs=["1", "2"], sequences=[
            Sequence(value="121", accept=True, display_order=1),
            Sequence(value="1", accept=True, display_order=2),
            Sequence(value="1111", accept=True, display_order=3),
            Sequence(value="1212", accept=False, display_order=4),
            Sequence(value="2121", accept=False, display_order=5),
        ]),
    Question(
        id=3, title='レベル３', question_text='1から始まり1で終わる文字列を受理する',
        allow_inputs=["1", "2"], sequences=[
            Sequence(value="121", accept=True, display_order=1),
            Sequence(value="1", accept=True, display_order=2),
            Sequence(value="1111", accept=True, display_order=3),
            Sequence(value="1212", accept=False, display_order=4),
            Sequence(value="2121", accept=False, display_order=5),
        ])
]
