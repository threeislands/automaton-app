from marshmallow.fields import Nested
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field

from flaskr.libs.camel_case_schema import CamelCaseSchema
from flaskr.model.user import User
from flaskr.schema.test_result_schema import TestResultSchema


class ClientUserSchema(SQLAlchemySchema, CamelCaseSchema):
    class Meta:
        model = User
        load_instance = True  # Optional: deserialize to model instances

    id = auto_field()
    display_name = auto_field()
    test_result_list = Nested(TestResultSchema, many=True)
