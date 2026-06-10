from datetime import datetime
from datetime import time
from datetime import timedelta

import pytest

from backend.domain.exc import IllegalStateError

from .conftest import NEXT_MONDAY
from .conftest import make_booking
from .conftest import make_schedule


def test_non_overlapping_bookings_are_valid() -> None:
    schedule = make_schedule()
    b1 = make_booking(
        start=datetime.combine(NEXT_MONDAY, time(10, 0)),
        end=datetime.combine(NEXT_MONDAY, time(11, 0)),
    )
    b2 = make_booking(
        start=datetime.combine(NEXT_MONDAY, time(11, 0)),
        end=datetime.combine(NEXT_MONDAY, time(12, 0)),
    )
    schedule.add_booking(b1)
    schedule.add_booking(b2)


def test_overlapping_bookings_raises() -> None:
    schedule = make_schedule()
    b1 = make_booking(
        start=datetime.combine(NEXT_MONDAY, time(10, 0)),
        end=datetime.combine(NEXT_MONDAY, time(11, 0)),
    )
    b2 = make_booking(
        start=datetime.combine(NEXT_MONDAY, time(10, 30)),
        end=datetime.combine(NEXT_MONDAY, time(11, 30)),
    )
    schedule.add_booking(b1)
    with pytest.raises(IllegalStateError):
        schedule.add_booking(b2)


def test_identical_booking_raises() -> None:
    schedule = make_schedule()
    start = datetime.combine(NEXT_MONDAY, time(10, 0))
    end = start + timedelta(hours=1)
    b1 = make_booking(start=start, end=end)
    b2 = make_booking(start=start, end=end)
    schedule.add_booking(b1)
    with pytest.raises(IllegalStateError):
        schedule.add_booking(b2)
