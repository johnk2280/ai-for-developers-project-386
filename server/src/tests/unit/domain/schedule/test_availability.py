from datetime import datetime
from datetime import time

import pytest

from backend.domain.exc import BusinessRuleError
from backend.domain.models.schedule import AvailabilityOverride
from backend.domain.models.schedule import TimeRange

from .conftest import NEXT_MONDAY
from .conftest import NEXT_TUESDAY
from .conftest import OWNER_ID
from .conftest import make_booking
from .conftest import make_rule
from .conftest import make_schedule


def test_booking_within_rule_period_is_valid() -> None:
    schedule = make_schedule()
    booking = make_booking(
        start=datetime.combine(NEXT_MONDAY, time(10, 0)),
        end=datetime.combine(NEXT_MONDAY, time(11, 0)),
    )
    schedule.add_booking(booking)


def test_booking_outside_rule_period_raises() -> None:
    schedule = make_schedule()
    booking = make_booking(
        start=datetime.combine(NEXT_MONDAY, time(7, 0)),
        end=datetime.combine(NEXT_MONDAY, time(8, 0)),
    )
    with pytest.raises(BusinessRuleError):
        schedule.add_booking(booking)


def test_no_rule_for_weekday_raises() -> None:
    schedule = make_schedule()
    booking = make_booking(
        start=datetime.combine(NEXT_TUESDAY, time(10, 0)),
        end=datetime.combine(NEXT_TUESDAY, time(11, 0)),
    )
    with pytest.raises(BusinessRuleError):
        schedule.add_booking(booking)


def test_override_takes_precedence_over_rule() -> None:
    override = AvailabilityOverride(owner_id=OWNER_ID, date=NEXT_MONDAY)
    override.add_period(TimeRange(time(14, 0), time(17, 0)))
    schedule = make_schedule(rules=(make_rule(),), overrides={override})

    booking = make_booking(
        start=datetime.combine(NEXT_MONDAY, time(10, 0)),
        end=datetime.combine(NEXT_MONDAY, time(11, 0)),
    )
    with pytest.raises(BusinessRuleError):
        schedule.add_booking(booking)


def test_booking_within_override_period_is_valid() -> None:
    override = AvailabilityOverride(owner_id=OWNER_ID, date=NEXT_MONDAY)
    override.add_period(TimeRange(time(14, 0), time(17, 0)))
    schedule = make_schedule(rules=(make_rule(),), overrides={override})

    booking = make_booking(
        start=datetime.combine(NEXT_MONDAY, time(14, 0)),
        end=datetime.combine(NEXT_MONDAY, time(15, 0)),
    )
    schedule.add_booking(booking)
