import uuid

from datetime import time

import pytest

from backend.domain.exc import IllegalStateError
from backend.domain.models.schedule import AvailabilityRule
from backend.domain.models.schedule import TimeRange


OWNER_ID = uuid.uuid4()


def make_rule() -> AvailabilityRule:
    return AvailabilityRule(owner_id=OWNER_ID, weekday=0)


def tr(sh: int, sm: int, eh: int, em: int) -> TimeRange:
    return TimeRange(time(sh, sm), time(eh, em))


def test_add_single_period() -> None:
    rule = make_rule()
    period = tr(9, 0, 10, 0)
    rule.add_period(period)
    assert period in rule.periods


def test_add_non_overlapping_periods() -> None:
    rule = make_rule()
    rule.add_period(tr(9, 0, 10, 0))
    rule.add_period(tr(11, 0, 12, 0))
    assert len(rule.periods) == 2


def test_adjacent_periods_are_not_overlap() -> None:
    rule = make_rule()
    rule.add_period(tr(9, 0, 10, 0))
    rule.add_period(tr(10, 0, 11, 0))
    assert len(rule.periods) == 2


def test_partial_overlap_at_start_raises() -> None:
    rule = make_rule()
    rule.add_period(tr(9, 0, 10, 0))
    with pytest.raises(IllegalStateError):
        rule.add_period(tr(8, 0, 9, 15))


def test_partial_overlap_at_end_raises() -> None:
    rule = make_rule()
    rule.add_period(tr(9, 0, 10, 0))
    with pytest.raises(IllegalStateError):
        rule.add_period(tr(9, 45, 10, 30))


def test_period_contained_within_existing_raises() -> None:
    rule = make_rule()
    rule.add_period(tr(9, 0, 10, 0))
    with pytest.raises(IllegalStateError):
        rule.add_period(tr(9, 15, 9, 45))


def test_new_period_contains_existing_raises() -> None:
    rule = make_rule()
    rule.add_period(tr(9, 0, 10, 0))
    with pytest.raises(IllegalStateError):
        rule.add_period(tr(8, 0, 11, 0))


def test_identical_period_raises() -> None:
    rule = make_rule()
    rule.add_period(tr(9, 0, 10, 0))
    with pytest.raises(IllegalStateError):
        rule.add_period(tr(9, 0, 10, 0))
