namespace CallCalendar;

@example(#{
    id: "bkg_01J9ABCD12",
    ownerId: "usr_01J8KZPX3N",
    status: BookingStatus.upcoming,
    start: utcDateTime.fromISO("2026-07-01T09:00:00Z"),
    end: utcDateTime.fromISO("2026-07-01T09:30:00Z"),
    typeId: "et_30min",
    reason: "Discuss Q3 roadmap.",
    platformId: "plt_zoom",
    url: "https://zoom.us/j/98765432100",
    guestName: "Maria Garcia",
    guestEmail: "maria.garcia@clientco.com"
})
model Booking {
    id: string;
    ownerId: string;
    status: BookingStatus;

    /** ISO 8601 datetime, aligned to 15-minute boundary */
    start: utcDateTime;

    /** ISO 8601 datetime, must be after start */
    end: utcDateTime;

    typeId: string;
    reason?: string;
    platformId: string;
    url: string;
    guestName: string;
    guestEmail: string;
}

@example(#{
    start: utcDateTime.fromISO("2026-07-01T09:00:00Z"),
    end: utcDateTime.fromISO("2026-07-01T09:30:00Z"),
    typeId: "et_30min",
    reason: "Discuss Q3 roadmap.",
    platformId: "plt_zoom",
    url: "https://zoom.us/j/98765432100",
    guestName: "Maria Garcia",
    guestEmail: "maria.garcia@clientco.com"
})
model BookingCreate {
    /** ISO 8601 datetime, aligned to 15-minute boundary */
    start: utcDateTime;

    /** ISO 8601 datetime, must be after start */
    end: utcDateTime;

    typeId: string;
    reason?: string;
    platformId: string;
    url: string;
    guestName: string;
    guestEmail: string;
}

@example(#{
    status: BookingStatus.past,
    reason: "Rescheduled.",
    url: "https://zoom.us/j/98765432100"
})
model BookingUpdate {
    status?: BookingStatus;
    reason?: string;
    platformId?: string;
    url?: string;
}
