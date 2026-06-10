from datetime import time

import pytest

from backend.domain.exc import InvariantError
from backend.domain.models.schedule import TimeRange


def test_15_minutes_is_valid() -> None:
    TimeRange(time(9, 0), time(9, 15))


def test_30_minutes_is_valid() -> None:
    TimeRange(time(9, 0), time(9, 30))


def test_60_minutes_is_valid() -> None:
    TimeRange(time(9, 0), time(10, 0))


def test_10_minutes_raises() -> None:
    with pytest.raises(InvariantError):
        TimeRange(time(9, 0), time(9, 10))


def test_20_minutes_raises() -> None:
    with pytest.raises(InvariantError):
        TimeRange(time(9, 0), time(9, 20))
