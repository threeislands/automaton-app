from flaskr.conf.db import db_session
from flaskr.model.created_automaton import CreatedAutomaton


class AutomatonService:
    @staticmethod
    def find_by_user_id_and_question_id(user_id, question_id):
        created_automaton = CreatedAutomaton.query.filter(
            CreatedAutomaton.user_id == user_id,
            CreatedAutomaton.question_id == question_id).first()
        return created_automaton

    @staticmethod
    def create(created_automaton):
        db_session.merge(created_automaton)
        db_session.commit()
