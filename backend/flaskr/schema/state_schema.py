from marshmallow import fields, validate, post_load, post_dump

from flaskr.libs.camel_case_schema import CamelCaseSchema
from flaskr.model.state import State


class StateSchema(CamelCaseSchema):
    id = fields.Str(required=True, validate=validate.Length(max=30))
    x = fields.Int(required=True, validate=validate.Range(min=0, max=1000))
    y = fields.Int(required=True, validate=validate.Range(min=0, max=1000))
    accept = fields.Boolean(required=True)

    @post_load
    def make_state(self, data, **kwargs):
        return State(**data)
