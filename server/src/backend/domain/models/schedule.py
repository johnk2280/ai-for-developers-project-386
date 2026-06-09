from dataclasses import dataclass
from dataclasses import field
from datetime import date
from datetime import time
from typing import Literal
from uuid import UUID

from .booking import Booking
from .event_type import EventType
from ..base import DomainModel


@dataclass(frozen=True, slots=True)
class TimeRange:
    start: time
    end: time


@dataclass(frozen=True, slots=True)
class AvailabilityRule:
    owner_id: UUID
    weekday: Literal[0, 1, 2, 3, 4, 5, 6]
    _periods: list[TimeRange] = field(default_factory=list, hash=False)

    def add_period(self, period: TimeRange) -> None:
        # TODO: добавить валидацию для обеспечения инвариантов
        self._periods.append(period)

    @property
    def periods(self) -> list[TimeRange]:
        return self._periods


@dataclass(frozen=True, slots=True)
class AvailabilityOverride:
    owner_id: UUID
    date: date
    _periods: list[TimeRange] = field(default_factory=list, hash=False)

    def add_period(self, period: TimeRange) -> None:
        # TODO: добавить валидацию для обеспечения инвариантов
        self._periods.append(period)

    @property
    def periods(self) -> list[TimeRange]:
        return self._periods


class Schedule(DomainModel):
    def __init__(
        self,
        id: UUID,  # noqa: A002
        owner_id: UUID,
        rules: tuple[AvailabilityRule],
        overrides: set[AvailabilityOverride],
        booked: list[Booking],
        event_types: list[EventType],
    ) -> None:
        self._id = id
        self._owner_id = owner_id
        self._rules = rules
        self._overrides = overrides
        self._booked = booked
        self._event_types = event_types
