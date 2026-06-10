# ruff: noqa: PLR2004, DTZ011

import uuid

from datetime import date
from datetime import time
from datetime import timedelta

import pytest

from backend.domain.exc import IllegalStateError
from backend.domain.models.schedule import AvailabilityOverride
from backend.domain.models.schedule import TimeRange


OWNER_ID = uuid.uuid4()
DATE = date.today() + timedelta(days=7)


def make_override() -> AvailabilityOverride:
    return AvailabilityOverride(owner_id=OWNER_ID, date=DATE)


def tr(sh: int, sm: int, eh: int, em: int) -> TimeRange:
    return TimeRange(time(sh, sm), time(eh, em))


def test_add_single_period() -> None:
    override = make_override()
    period = tr(9, 0, 10, 0)
    override.add_period(period)
    assert period in override.periods


def test_add_non_overlapping_periods() -> None:
    override = make_override()
    override.add_period(tr(9, 0, 10, 0))
    override.add_period(tr(11, 0, 12, 0))
    assert len(override.periods) == 2


def test_adjacent_periods_are_not_overlap() -> None:
    override = make_override()
    override.add_period(tr(9, 0, 10, 0))
    override.add_period(tr(10, 0, 11, 0))
    assert len(override.periods) == 2


def test_partial_overlap_at_start_raises() -> None:
    override = make_override()
    override.add_period(tr(9, 0, 10, 0))
    with pytest.raises(IllegalStateError):
        override.add_period(tr(8, 0, 9, 15))


def test_partial_overlap_at_end_raises() -> None:
    override = make_override()
    override.add_period(tr(9, 0, 10, 0))
    with pytest.raises(IllegalStateError):
        override.add_period(tr(9, 45, 10, 30))


def test_period_contained_within_existing_raises() -> None:
    override = make_override()
    override.add_period(tr(9, 0, 10, 0))
    with pytest.raises(IllegalStateError):
        override.add_period(tr(9, 15, 9, 45))


def test_new_period_contains_existing_raises() -> None:
    override = make_override()
    override.add_period(tr(9, 0, 10, 0))
    with pytest.raises(IllegalStateError):
        override.add_period(tr(8, 0, 11, 0))


def test_identical_period_raises() -> None:
    override = make_override()
    override.add_period(tr(9, 0, 10, 0))
    with pytest.raises(IllegalStateError):
        override.add_period(tr(9, 0, 10, 0))
