# ruff: noqa: ANN401, DTZ011

import uuid

from datetime import date
from datetime import datetime
from datetime import time
from datetime import timedelta
from typing import Any

from backend.domain.declarations import BookingStatus
from backend.domain.models.booking import Booking
from backend.domain.models.event_type import EventType
from backend.domain.models.schedule import AvailabilityRule
from backend.domain.models.schedule import Schedule
from backend.domain.models.schedule import TimeRange


OWNER_ID = uuid.uuid4()
SCHEDULE_ID = uuid.uuid4()
TYPE_ID = uuid.uuid4()
PLATFORM_ID = uuid.uuid4()


def _next_weekday(weekday: int) -> date:
    today = date.today()
    days_ahead = weekday - today.weekday()
    if days_ahead <= 0:
        days_ahead += 7
    return today + timedelta(days=days_ahead)


NEXT_MONDAY = _next_weekday(0)
NEXT_TUESDAY = _next_weekday(1)
BOOKING_START = datetime.combine(NEXT_MONDAY, time(10, 0))
BOOKING_END = datetime.combine(NEXT_MONDAY, time(11, 0))


def make_event_type(duration: int = 60) -> EventType:
    return EventType(
        id=TYPE_ID,
        duration=duration,
        name='Consultation',
        description='',
    )


def make_rule() -> AvailabilityRule:
    rule = AvailabilityRule(owner_id=OWNER_ID, weekday=0)
    rule.add_period(TimeRange(time(9, 0), time(17, 0)))
    return rule


def make_booking(**kwargs: Any) -> Booking:
    defaults: dict[str, Any] = {
        'id': uuid.uuid4(),
        'owner_id': OWNER_ID,
        'status': BookingStatus.UPCOMING,
        'start': BOOKING_START,
        'end': BOOKING_END,
        'type_id': TYPE_ID,
        'reason': '',
        'platform_id': PLATFORM_ID,
        'url': 'https://meet.example.com/abc',
        'guest_name': 'John Doe',
        'guest_email': 'john@example.com',
    }
    return Booking(**{**defaults, **kwargs})  # type: ignore[arg-type]


def make_schedule(**kwargs: Any) -> Schedule:
    defaults: dict[str, Any] = {
        'id': SCHEDULE_ID,
        'owner_id': OWNER_ID,
        'rules': (make_rule(),),
        'overrides': set(),
        'booked': [],
        'event_types': [make_event_type()],
    }
    return Schedule(**{**defaults, **kwargs})  # type: ignore[arg-type]
