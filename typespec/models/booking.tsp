namespace CallCalendar;

model Booking {
    id: string;
    ownerId: string;
    status: BookingStatus;

    /** ISO 8601 datetime, aligned to 15-minute boundary */
    start: utcDateTime;

    /** ISO 8601 datetime, must be after start */
    end: utcDateTime;

    typeId: string;
    reason: string;
    platformId: string;
    url: string;
    guestName: string;
    guestEmail: string;
}

model BookingCreate {
    /** ISO 8601 datetime, aligned to 15-minute boundary */
    start: utcDateTime;

    /** ISO 8601 datetime, must be after start */
    end: utcDateTime;

    typeId: string;
    reason: string;
    platformId: string;
    url: string;
    guestName: string;
    guestEmail: string;
}

model BookingUpdate {
    status?: BookingStatus;
    reason?: string;
    platformId?: string;
    url?: string;
}
