from datetime import datetime

from sqlalchemy import Column, INT, String, JSON, DATETIME
from sqlalchemy.orm import relationship

from flaskr.model.base_model import BaseModel


class Question(BaseModel):

    __tablename__ = 'question'

    id = Column(INT, primary_key=True, autoincrement=False)
    title = Column(String(10))
    question_text = Column(String(100))
    allow_inputs = Column(JSON())
    sequences = relationship('Sequence', backref='question', order_by="Sequence.display_order")
