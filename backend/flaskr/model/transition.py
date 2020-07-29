from dataclasses import dataclass
from typing import List


@dataclass()
class Transition:
    id: str
    from_state_id: str
    to_state_id: str
    inputs: List[str]
