from flaskr.model.sequence import Sequence
from flaskr.model.question import Question

questions = [
    Question(
        id=1, title='レベル１', question_text='0で終わる文字列',
        allow_inputs=["0", "1"], sequences=[
            Sequence(value="0110", accept=True, masked=False, display_order=1),
            Sequence(value="0", accept=True, masked=False, display_order=2),
            Sequence(value="100", accept=True, masked=False, display_order=3),
            Sequence(value="", accept=False, masked=False, display_order=4),
            Sequence(value="001", accept=False, masked=False, display_order=5),
            Sequence(value="1101", accept=False, masked=False, display_order=6),
        ]),
    Question(
        id=2, title='レベル２', question_text='1から始まる文字列',
        allow_inputs=["0", "1"], sequences=[
            Sequence(value="1", accept=True, masked=False, display_order=1),
            Sequence(value="1001", accept=True, masked=False, display_order=2),
            Sequence(value="110", accept=True, masked=False, display_order=3),
            Sequence(value="", accept=False, masked=False, display_order=4),
            Sequence(value="0101", accept=False, masked=False, display_order=5),
        ]),
    Question(
        id=3, title='レベル３', question_text='1を含む文字列',
        allow_inputs=["0", "1", "2"], sequences=[
            Sequence(value="0210", accept=True, masked=False, display_order=1),
            Sequence(value="1", accept=True, masked=False, display_order=2),
            Sequence(value="102", accept=True, masked=True, display_order=3),
            Sequence(value="", accept=False, masked=False, display_order=4),
            Sequence(value="0220", accept=False, masked=True, display_order=5),
            Sequence(value="200", accept=False, masked=True, display_order=6),
        ]),
    Question(
        id=4, title='レベル４', question_text='文字列の長さが偶数である文字列(空文字の長さは0)',
        allow_inputs=["0", "1"], sequences=[
            Sequence(value="10", accept=True, masked=False, display_order=1),
            Sequence(value="0110", accept=True, masked=False, display_order=2),
            Sequence(value="", accept=True, masked=True, display_order=3),
            Sequence(value="1011", accept=True, masked=True, display_order=4),
            Sequence(value="0", accept=False, masked=False, display_order=5),
            Sequence(value="101", accept=False, masked=True, display_order=6),
            Sequence(value="01001", accept=False, masked=True, display_order=7),
        ]),
    Question(
        id=5, title='レベル５', question_text='先頭の文字と末尾の文字が同じである文字列',
        allow_inputs=["0", "1"], sequences=[
            Sequence(value="0", accept=True, masked=False, display_order=1),
            Sequence(value="1", accept=True, masked=False, display_order=2),
            Sequence(value="10011", accept=True, masked=True, display_order=3),
            Sequence(value="01000", accept=True, masked=True, display_order=4),
            Sequence(value="", accept=False, masked=False, display_order=5),
            Sequence(value="1000", accept=False, masked=True, display_order=6),
            Sequence(value="01011", accept=False, masked=True, display_order=7),
        ]),
    Question(
        id=6, title='レベル６', question_text='101を含む文字列',
        allow_inputs=["0", "1"], sequences=[
            Sequence(value="1010", accept=True, masked=False, display_order=1),
            Sequence(value="011011", accept=True, masked=True, display_order=2),
            Sequence(value="010011", accept=False, masked=False, display_order=3),
            Sequence(value="", accept=False, masked=True, display_order=4),
            Sequence(value="10001", accept=False, masked=True, display_order=5),
        ]),
    Question(
        id=7, title='レベル７', question_text='同じ文字が連続して並ばない文字列(空文字を含む)',
        allow_inputs=["0", "1", "2"], sequences=[
            Sequence(value="01210", accept=True, masked=True, display_order=1),
            Sequence(value="", accept=True, masked=True, display_order=2),
            Sequence(value="210201", accept=True, masked=True, display_order=3),
            Sequence(value="10212", accept=True, masked=True, display_order=4),
            Sequence(value="1102", accept=False, masked=True, display_order=5),
            Sequence(value="12022", accept=False, masked=True, display_order=6),
            Sequence(value="0100", accept=False, masked=True, display_order=7),
        ]),
    Question(
        id=8, title='レベル８', question_text='各数字の和が3の倍数となる文字列(空文字の和は0)',
        allow_inputs=["0", "1", "2"], sequences=[
            Sequence(value="00", accept=True, masked=True, display_order=1),
            Sequence(value="", accept=True, masked=True, display_order=2),
            Sequence(value="12", accept=True, masked=True, display_order=3),
            Sequence(value="202011", accept=True, masked=True, display_order=4),
            Sequence(value="11", accept=False, masked=True, display_order=5),
            Sequence(value="01", accept=False, masked=True, display_order=6),
            Sequence(value="221101", accept=False, masked=True, display_order=7),
        ])
]
