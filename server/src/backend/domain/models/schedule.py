from dataclasses import dataclass
from dataclasses import field
from datetime import UTC
from datetime import date
from datetime import datetime
from datetime import time
from typing import Literal
from uuid import UUID

from .booking import Booking
from .event_type import EventType
from ..base import DomainModel
from ..exc import BusinessRuleError
from ..exc import IllegalStateError
from ..exc import IntegrityError
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
    _periods: set[TimeRange] = field(default_factory=set, hash=False)

    def __post_init__(self) -> None:
        self._validate_weekday()

    def _validate_weekday(self) -> None:
        if not (0 <= self.weekday < 7):  # noqa: PLR2004
            msg = 'weekday must be in range 0..6'
            raise InvariantError(msg)

    def add_period(self, period: TimeRange) -> None:
        self._validate_no_overlap(period)
        self._periods.add(period)

    def _validate_no_overlap(self, period: TimeRange) -> None:
        for existing in self._periods:
            if period.start < existing.end and existing.start < period.end:
                msg = f'period {period} overlaps with existing {existing}'
                raise IllegalStateError(msg)

    @property
    def periods(self) -> set[TimeRange]:
        return self._periods


@dataclass(frozen=True, slots=True)
class AvailabilityOverride:
    owner_id: UUID
    date: date
    _periods: set[TimeRange] = field(default_factory=set, hash=False)

    def __post_init__(self) -> None:
        self._validate_date()

    def _validate_date(self) -> None:
        if self.date < datetime.now(UTC).date():
            msg = 'date must be today or in the future'
            raise InvariantError(msg)

    def add_period(self, period: TimeRange) -> None:
        self._validate_no_overlap(period)
        self._periods.add(period)

    def _validate_no_overlap(self, period: TimeRange) -> None:
        for existing in self._periods:
            if period.start < existing.end and existing.start < period.end:
                msg = f'period {period} overlaps with existing {existing}'
                raise IllegalStateError(msg)

    @property
    def periods(self) -> set[TimeRange]:
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

    @property
    def pk(self) -> UUID:
        return self._id

    def add_booking(self, booking: Booking) -> None:
        self._validate_booking_in_future(booking)
        self._validate_no_overlap(booking)
        self._validate_availability(booking)
        self._validate_event_type_exists(booking)
        self._validate_duration_matches(booking)
        self._booked.append(booking)

    def _validate_booking_in_future(self, booking: Booking) -> None:
        if booking.start <= datetime.now():  # noqa: DTZ005
            msg = 'booking start must be in the future'
            raise BusinessRuleError(msg)

    def _validate_no_overlap(self, booking: Booking) -> None:
        for existing in self._booked:
            if booking.start < existing.end and existing.start < booking.end:
                msg = 'booking overlaps with existing booking'
                raise IllegalStateError(msg)

    def _validate_availability(self, booking: Booking) -> None:
        booking_date = booking.start.date()
        start_time = booking.start.time()
        end_time = booking.end.time()

        for override in self._overrides:
            if override.date == booking_date:
                for period in override.periods:
                    if period.start <= start_time and end_time <= period.end:
                        return
                msg = 'booking is outside available override periods'
                raise BusinessRuleError(msg)

        for rule in self._rules:
            if rule.weekday == booking.start.weekday():
                for period in rule.periods:
                    if period.start <= start_time and end_time <= period.end:
                        return
                msg = 'booking is outside available rule periods'
                raise BusinessRuleError(msg)

        msg = 'no availability rule or override found for this booking'
        raise BusinessRuleError(msg)

    def _validate_event_type_exists(self, booking: Booking) -> None:
        for event_type in self._event_types:
            if event_type.pk == booking.type_id:
                return
        msg = f'event type {booking.type_id} not found in schedule'
        raise IntegrityError(msg)

    def _validate_duration_matches(self, booking: Booking) -> None:
        duration = int((booking.end - booking.start).total_seconds() // 60)
        for event_type in self._event_types:
            if event_type.pk == booking.type_id:
                if event_type.duration != duration:
                    msg = (
                        f'booking duration {duration} min does not match '
                        f'event type duration {event_type.duration} min'
                    )
                    raise BusinessRuleError(msg)
                return
