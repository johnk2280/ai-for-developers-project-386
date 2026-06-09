from datetime import datetime
from uuid import UUID

from ..base import DomainModel
from ..declarations import BookingStatus


class Booking(DomainModel):
    def __init__(
        self,
        id: UUID,  # noqa: A002
        owner_id: UUID,
        status: BookingStatus,
        start: datetime,
        end: datetime,
        type_id: UUID,
        reason: str,
        platform_id: UUID,
        url: str,
        guest_name: str,
        guest_email: str,
    ) -> None:
        self._id = id
        self._owner_id = owner_id
        self.status = status
        self.start = start
        self.end = end
        self.type_id = type_id
        self.reason = reason
        self.platform_id = platform_id
        self.url = url
        self.guest_name = guest_name
        self.guest_email = guest_email
