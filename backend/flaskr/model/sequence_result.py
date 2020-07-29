from dataclasses import dataclass, field
from typing import List


@dataclass()
class SequenceResult:
    sequence_id: str = None
    result: bool = None
    state_order_list: List[str] = field(default_factory=list)
    transition_order_list: List[str] = field(default_factory=list)
