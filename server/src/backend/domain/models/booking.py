from datetime import datetime
from uuid import UUID

from ..base import DomainModel
from ..declarations import BookingStatus
from ..exc import InvariantError


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
        self._validate_order()
        self._validate_duration_multiple()
        self._validate_start_alignment()
        self._validate_guest_name()
        self._validate_guest_email()
        self._validate_url()

    @property
    def pk(self) -> UUID:
        return self._id

    def _validate_order(self) -> None:
        if self.start >= self.end:
            msg = 'start must be before end'
            raise InvariantError(msg)

    def _validate_duration_multiple(self) -> None:
        duration_minutes = int((self.end - self.start).total_seconds() // 60)
        if duration_minutes % 15 != 0:
            msg = 'duration must be a multiple of 15 minutes'
            raise InvariantError(msg)

    def _validate_start_alignment(self) -> None:
        if self.start.minute % 15 != 0:
            msg = 'start must be aligned to a 15-minute boundary'
            raise InvariantError(msg)

    def _validate_guest_name(self) -> None:
        if not self.guest_name.strip():
            msg = 'guest_name must not be empty'
            raise InvariantError(msg)

    def _validate_guest_email(self) -> None:
        if not self.guest_email.strip():
            msg = 'guest_email must not be empty'
            raise InvariantError(msg)

    def _validate_url(self) -> None:
        if not self.url.strip():
            msg = 'url must not be empty'
            raise InvariantError(msg)
