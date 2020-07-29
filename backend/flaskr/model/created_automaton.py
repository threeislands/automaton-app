from sqlalchemy import Column, INT, JSON, ForeignKey

from flaskr.model.base_model import BaseModel


class CreatedAutomaton(BaseModel):
    __tablename__ = 'created_automaton'

    user_id = Column(INT, ForeignKey("user.id"), primary_key=True)
    question_id = Column(INT, ForeignKey("question.id"), primary_key=True)
    automaton_data = Column(JSON())
