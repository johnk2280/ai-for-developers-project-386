# ruff: noqa: DTZ011

from datetime import date
from datetime import datetime
from datetime import time

import pytest

from backend.domain.exc import InvariantError

from .conftest import make_booking


_TODAY = date.today()


def dt(h: int, m: int) -> datetime:
    return datetime.combine(_TODAY, time(h, m))


def test_valid_time_range() -> None:
    make_booking(start=dt(9, 0), end=dt(9, 15))


def test_start_equal_to_end_raises() -> None:
    with pytest.raises(InvariantError):
        make_booking(start=dt(9, 0), end=dt(9, 0))


def test_start_after_end_raises() -> None:
    with pytest.raises(InvariantError):
        make_booking(start=dt(10, 0), end=dt(9, 0))


def test_duration_not_multiple_of_15_raises() -> None:
    with pytest.raises(InvariantError):
        make_booking(start=dt(9, 0), end=dt(9, 20))


def test_start_aligned_to_00_is_valid() -> None:
    make_booking(start=dt(9, 0), end=dt(9, 15))


def test_start_aligned_to_15_is_valid() -> None:
    make_booking(start=dt(9, 15), end=dt(9, 30))


def test_start_aligned_to_30_is_valid() -> None:
    make_booking(start=dt(9, 30), end=dt(9, 45))


def test_start_aligned_to_45_is_valid() -> None:
    make_booking(start=dt(9, 45), end=dt(10, 0))


def test_start_not_aligned_raises() -> None:
    with pytest.raises(InvariantError):
        make_booking(start=dt(9, 10), end=dt(9, 25))
