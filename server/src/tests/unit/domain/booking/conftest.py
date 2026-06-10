# ruff: noqa: ANN401, DTZ011

import uuid

from datetime import date
from datetime import datetime
from datetime import time
from typing import Any

from backend.domain.declarations import BookingStatus
from backend.domain.models.booking import Booking


OWNER_ID = uuid.uuid4()
TYPE_ID = uuid.uuid4()
PLATFORM_ID = uuid.uuid4()

_TODAY = date.today()
START = datetime.combine(_TODAY, time(9, 0))
END = datetime.combine(_TODAY, time(10, 0))


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
