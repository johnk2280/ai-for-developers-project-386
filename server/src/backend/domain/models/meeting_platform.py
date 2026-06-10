from uuid import UUID

from ..base import DomainModel


class MeetingPlatform(DomainModel):
    id: UUID
    name: str
    base_url: str
