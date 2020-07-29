from marshmallow import fields, post_load

from flaskr.schema.state_schema import StateSchema
from flaskr.schema.transition_schema import TransitionSchema
from flaskr.libs.camel_case_schema import CamelCaseSchema
from flaskr.model.automaton import Automaton


class AutomatonSchema(CamelCaseSchema):
    states = fields.List(fields.Nested(lambda: StateSchema()))
    transitions = fields.List(fields.Nested(lambda: TransitionSchema()))
    count = fields.Int()

    @post_load
    def make_automaton(self, data, **kwargs):
        return Automaton(**data)
