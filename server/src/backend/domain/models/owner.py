from uuid import UUID

from ..base import DomainModel


class Owner(DomainModel):
    id: UUID
    name: str
    username: str
    email: str
    timezone: str
