import uuid

import pytest

from backend.domain.exc import InvariantError
from backend.domain.models.schedule import AvailabilityRule


OWNER_ID = uuid.uuid4()


def test_weekday_0_is_valid() -> None:
    AvailabilityRule(owner_id=OWNER_ID, weekday=0)


def test_weekday_6_is_valid() -> None:
    AvailabilityRule(owner_id=OWNER_ID, weekday=6)


def test_weekday_negative_raises() -> None:
    with pytest.raises(InvariantError):
        AvailabilityRule(owner_id=OWNER_ID, weekday=-1)  # type: ignore[arg-type]


def test_weekday_7_raises() -> None:
    with pytest.raises(InvariantError):
        AvailabilityRule(owner_id=OWNER_ID, weekday=7)  # type: ignore[arg-type]
