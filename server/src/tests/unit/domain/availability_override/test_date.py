# ruff: noqa: DTZ011

import uuid

from datetime import date
from datetime import timedelta

import pytest

from backend.domain.exc import InvariantError
from backend.domain.models.schedule import AvailabilityOverride


OWNER_ID = uuid.uuid4()


def test_today_is_valid() -> None:
    AvailabilityOverride(owner_id=OWNER_ID, date=date.today())


def test_future_date_is_valid() -> None:
    AvailabilityOverride(
        owner_id=OWNER_ID,
        date=date.today() + timedelta(days=1),
    )


def test_past_date_raises() -> None:
    with pytest.raises(InvariantError):
        AvailabilityOverride(
            owner_id=OWNER_ID,
            date=date.today() - timedelta(days=1),
        )
