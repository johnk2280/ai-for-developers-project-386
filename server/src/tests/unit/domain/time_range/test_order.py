from datetime import time

import pytest

from backend.domain.exc import InvariantError
from backend.domain.models.schedule import TimeRange


def test_start_before_end_is_valid() -> None:
    TimeRange(time(9, 0), time(9, 15))


def test_start_equal_to_end_raises() -> None:
    with pytest.raises(InvariantError):
        TimeRange(time(9, 0), time(9, 0))


def test_start_after_end_raises() -> None:
    with pytest.raises(InvariantError):
        TimeRange(time(10, 0), time(9, 0))
