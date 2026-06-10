import uuid

from datetime import timedelta

import pytest

from backend.domain.exc import BusinessRuleError
from backend.domain.exc import IntegrityError

from .conftest import BOOKING_END
from .conftest import BOOKING_START
from .conftest import make_booking
from .conftest import make_event_type
from .conftest import make_schedule


def test_unknown_event_type_raises() -> None:
    schedule = make_schedule()
    booking = make_booking(type_id=uuid.uuid4())
    with pytest.raises(IntegrityError):
        schedule.add_booking(booking)


def test_matching_duration_is_valid() -> None:
    schedule = make_schedule()
    booking = make_booking(start=BOOKING_START, end=BOOKING_END)
    schedule.add_booking(booking)


def test_mismatched_duration_raises() -> None:
    schedule = make_schedule(event_types=[make_event_type(duration=60)])
    booking = make_booking(
        start=BOOKING_START,
        end=BOOKING_START + timedelta(minutes=30),
    )
    with pytest.raises(BusinessRuleError):
        schedule.add_booking(booking)
