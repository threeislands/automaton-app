from marshmallow import fields, validate, post_load, post_dump

from flaskr.model.sequence_result import SequenceResult
from flaskr.libs.camel_case_schema import CamelCaseSchema


class SequenceResultSchema(CamelCaseSchema):
    sequence_id = fields.Int()
    result = fields.Bool()
    state_order_list = fields.List(fields.Str(), required=True)
    transition_order_list = fields.List(fields.Str(), required=True)

    @post_load
    def make_transition(self, data, **kwargs):
        return SequenceResult(**data)
