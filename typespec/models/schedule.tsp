namespace CallCalendar;

model Schedule {
    id: string;
    ownerId: string;
}

model ScheduleUpdate {
    /** Reserved for future schedule-level metadata */
}

/** 0 = Monday … 6 = Sunday */
scalar Weekday extends integer;

model AvailabilityRule {
    ownerId: string;

    /** 0 = Monday, 6 = Sunday */
    weekday: Weekday;

    periods: TimeRange[];
}

model AvailabilityRuleWrite {
    /** 0 = Monday, 6 = Sunday */
    weekday: Weekday;

    periods: TimeRange[];
}

model AvailabilityOverride {
    ownerId: string;

    /** ISO 8601 date, must be today or in the future */
    date: plainDate;

    periods: TimeRange[];
}

model AvailabilityOverrideCreate {
    /** ISO 8601 date, must be today or in the future */
    date: plainDate;

    periods: TimeRange[];
}

model AvailabilityOverrideUpdate {
    periods: TimeRange[];
}
