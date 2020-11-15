from sqlalchemy import Column, String, INT
from sqlalchemy.orm import relationship

from flaskr.model.base_model import BaseModel
from flaskr.model.test_result import TestResult


class User(BaseModel):
    __tablename__ = 'user'
    __table_args__ = {'extend_existing': True}

    id = Column(INT, primary_key=True, autoincrement=True)
    display_name = Column(String(10))
    external_identifier = Column(String(300))
    external_auth_code = Column(String(2))
    test_result_list = relationship(TestResult, backref='user')
