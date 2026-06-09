from dataclasses import dataclass
from dataclasses import field
from datetime import date
from datetime import time
from typing import Literal
from uuid import UUID

from .booking import Booking
from .event_type import EventType
from ..base import DomainModel
from ..exc import IllegalStateError
from ..exc import InvariantError


@dataclass(frozen=True, slots=True)
class TimeRange:
    start: time
    end: time

    def __post_init__(self) -> None:
        self._validate_order()
        self._validate_duration_multiple()

    def _validate_order(self) -> None:
        if self.start >= self.end:
            msg = 'start must be before end'
            raise InvariantError(msg)

    def _validate_duration_multiple(self) -> None:
        start_min = self.start.hour * 60 + self.start.minute
        end_min = self.end.hour * 60 + self.end.minute
        if (end_min - start_min) % 15 != 0:
            msg = 'duration must be a multiple of 15 minutes'
            raise InvariantError(msg)


@dataclass(frozen=True, slots=True)
class AvailabilityRule:
    owner_id: UUID
    weekday: Literal[0, 1, 2, 3, 4, 5, 6]
    _periods: list[TimeRange] = field(default_factory=list, hash=False)

    def add_period(self, period: TimeRange) -> None:
        self._validate_no_overlap(period)
        self._periods.append(period)

    def _validate_no_overlap(self, period: TimeRange) -> None:
        for existing in self._periods:
            if period.start < existing.end and existing.start < period.end:
                msg = f'period {period} overlaps with existing {existing}'
                raise IllegalStateError(msg)

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
