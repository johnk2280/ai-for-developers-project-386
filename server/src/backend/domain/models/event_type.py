from uuid import UUID

from ..base import DomainModel


class EventType(DomainModel):
    id: UUID
    duration: int
    name: str
    description: str
