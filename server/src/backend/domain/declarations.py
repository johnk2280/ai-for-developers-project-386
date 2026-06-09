from enum import StrEnum


class BookingStatus(StrEnum):
    UPCOMING = 'upcoming'
    UNCONFIRMED = 'unconfirmed'
    RECURRING = 'recurring'
    PAST = 'past'
    CANCELLED = 'cancelled'
