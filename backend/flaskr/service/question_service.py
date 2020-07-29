from flaskr.model.question import Question
from flaskr.model.sequence import Sequence


class QuestionService:
    @staticmethod
    def find_by_id(question_id):
        question_data = Question.query.filter(Question.id == question_id).one()

        return question_data

    @staticmethod
    def find_sequences_by_question_id(question_id):
        sequences = Sequence.query.filter(Sequence.question_id == question_id)\
                            .order_by(Sequence.display_order).all()

        return sequences
