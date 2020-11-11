from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field

from flaskr.model.sequence import Sequence


class SequenceSchema(SQLAlchemySchema):
    class Meta:
        model = Sequence
        load_instance = True  # Optional: deserialize to model instances

    id = auto_field()
    value = auto_field()
    accept = auto_field()
    masked = auto_field()
