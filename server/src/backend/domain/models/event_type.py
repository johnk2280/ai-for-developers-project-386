from uuid import UUID

from ..base import DomainModel
from ..exc import InvariantError


class EventType(DomainModel):
    def __init__(
        self,
        id: UUID,  # noqa: A002
        duration: int,
        name: str,
        description: str,
    ) -> None:
        self._id = id
        self._duration = duration
        self._name = name
        self._description = description
        self._validate_duration()
        self._validate_name()

    @property
    def pk(self) -> UUID:
        return self._id

    @property
    def duration(self) -> int:
        return self._duration

    def _validate_duration(self) -> None:
        if self._duration <= 0 or self._duration % 15 != 0:
            msg = 'duration must be a positive multiple of 15 minutes'
            raise InvariantError(msg)

    def _validate_name(self) -> None:
        if not self._name.strip():
            msg = 'name must not be empty'
            raise InvariantError(msg)
