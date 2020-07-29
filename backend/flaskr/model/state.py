from dataclasses import dataclass


@dataclass
class State:
    id: str
    x: int
    y: int
    accept: bool
