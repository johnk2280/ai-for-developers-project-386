import "@typespec/http";

using TypeSpec.Http;

namespace CallCalendar;

enum BookingStatus {
    upcoming,
    unconfirmed,
    recurring,
    past,
    cancelled,
}

@example(#{ start: plainTime.fromISO("09:00:00"), end: plainTime.fromISO("17:00:00") })
model TimeRange {
    /** HH:MM format, aligned to 15-minute boundary */
    start: plainTime;

    /** HH:MM format, aligned to 15-minute boundary, must be after start */
    end: plainTime;
}
