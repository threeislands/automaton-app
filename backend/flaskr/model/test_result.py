from datetime import datetime

from sqlalchemy import Column, INT, BOOLEAN, ForeignKey, DATETIME

from flaskr.model.base_model import BaseModel


class TestResult(BaseModel):

    __tablename__ = 'test_result'

    user_id = Column(INT, ForeignKey('user.id'), primary_key=True)
    question_id = Column(INT, ForeignKey('question.id'), primary_key=True)
    passed = Column(BOOLEAN)
