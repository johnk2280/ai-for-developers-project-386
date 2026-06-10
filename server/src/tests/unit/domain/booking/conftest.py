# ruff: noqa: DTZ001
# ruff: noqa: ANN401

import uuid

from datetime import datetime
from typing import Any

from backend.domain.declarations import BookingStatus
from backend.domain.models.booking import Booking


OWNER_ID = uuid.uuid4()
TYPE_ID = uuid.uuid4()
PLATFORM_ID = uuid.uuid4()

START = datetime(2026, 6, 10, 9, 0)
END = datetime(2026, 6, 10, 10, 0)


def make_booking(**kwargs: Any) -> Booking:
    defaults: dict[str, Any] = {
        'id': uuid.uuid4(),
        'owner_id': OWNER_ID,
        'status': BookingStatus.UPCOMING,
        'start': START,
        'end': END,
        'type_id': TYPE_ID,
        'reason': '',
        'platform_id': PLATFORM_ID,
        'url': 'https://meet.example.com/abc',
        'guest_name': 'John Doe',
        'guest_email': 'john@example.com',
    }
    return Booking(**{**defaults, **kwargs})  # type: ignore[arg-type]
