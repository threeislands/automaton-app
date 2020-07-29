from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field

from flaskr.libs.camel_case_schema import CamelCaseSchema
from flaskr.model.test_result import TestResult


class TestResultSchema(SQLAlchemySchema, CamelCaseSchema):
    class Meta:
        model = TestResult
        load_instance = True  # Optional: deserialize to model instances

    question_id = auto_field()
    passed = auto_field()
