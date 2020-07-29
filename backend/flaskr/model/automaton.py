from typing import List
from dataclasses import dataclass

from flaskr.model.state import State
from flaskr.model.transition import Transition


@dataclass()
class Automaton:
    states: List[State]
    transitions: List[Transition]
    count: int = None
