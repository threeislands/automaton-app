from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from flaskr.model.user import User


class CredentialUserSchema(SQLAlchemySchema):
    class Meta:
        model = User
        load_instance = True  # Optional: deserialize to model instances

    id = auto_field()
    display_name = auto_field()
    external_identifier = auto_field()
