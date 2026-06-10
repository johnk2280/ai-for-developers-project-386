from datetime import timedelta

import pytest

from backend.domain.exc import BusinessRuleError

from .conftest import BOOKING_END
from .conftest import BOOKING_START
from .conftest import make_booking
from .conftest import make_schedule


def test_future_booking_is_valid() -> None:
    schedule = make_schedule()
    booking = make_booking(start=BOOKING_START, end=BOOKING_END)
    schedule.add_booking(booking)


def test_past_booking_raises() -> None:
    schedule = make_schedule()
    past_start = (BOOKING_START - timedelta(days=14)).replace(
        hour=10,
        minute=0,
        second=0,
        microsecond=0,
    )
    past_end = past_start + timedelta(hours=1)
    booking = make_booking(start=past_start, end=past_end)
    with pytest.raises(BusinessRuleError):
        schedule.add_booking(booking)
