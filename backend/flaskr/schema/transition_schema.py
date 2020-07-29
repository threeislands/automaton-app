from marshmallow import fields, validate, post_load

from flaskr.libs.camel_case_schema import CamelCaseSchema
from flaskr.model.transition import Transition


class TransitionSchema(CamelCaseSchema):
    id = fields.Str(required=True, validate=validate.Length(max=30))
    from_state_id = fields.Str(required=True, validate=validate.Length(max=30))
    to_state_id = fields.Str(required=True, validate=validate.Length(max=30))
    inputs = fields.List(fields.Str(), required=True)

    @post_load
    def make_transition(self, data, **kwargs):
        return Transition(**data)
