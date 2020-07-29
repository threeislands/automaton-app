from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from marshmallow_sqlalchemy.fields import Nested

from flaskr.libs.camel_case_schema import CamelCaseSchema
from flaskr.model.question import Question
from flaskr.schema.sequence_schema import SequenceSchema


class QuestionSchema(SQLAlchemySchema, CamelCaseSchema):
    class Meta:
        model = Question
        load_instance = True  # Optional: deserialize to model instances

    id = auto_field()
    title = auto_field()
    question_text = auto_field()
    allow_inputs = auto_field()
    sequences = Nested(SequenceSchema, many=True)
