from datetime import datetime

from sqlalchemy import Column, INT, String, Boolean, ForeignKey, DATETIME

from flaskr.model.base_model import BaseModel


class Sequence(BaseModel):
    __tablename__ = 'sequence'

    id = Column(INT, primary_key=True, autoincrement=True)
    question_id = Column(INT, ForeignKey('question.id'))
    value = Column(String(100))
    accept = Column(Boolean)
    masked = Column(Boolean)
    display_order = Column(INT)
