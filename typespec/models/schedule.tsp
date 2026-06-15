namespace CallCalendar;

@example(#{ id: "sch_01J8KZPX3N", ownerId: "usr_01J8KZPX3N" })
model Schedule {
    id: string;
    ownerId: string;
}

model ScheduleUpdate {
    /** Reserved for future schedule-level metadata */
}

/** 0 = Monday … 6 = Sunday */
scalar Weekday extends integer;

@example(#{
    ownerId: "usr_01J8KZPX3N",
    weekday: 0,
    periods: #[#{ start: plainTime.fromISO("09:00:00"), end: plainTime.fromISO("12:00:00") }, #{ start: plainTime.fromISO("13:00:00"), end: plainTime.fromISO("17:00:00") }]
})
model AvailabilityRule {
    ownerId: string;

    /** 0 = Monday, 6 = Sunday */
    weekday: Weekday;

    periods: TimeRange[];
}

@example(#{
    weekday: 0,
    periods: #[#{ start: plainTime.fromISO("09:00:00"), end: plainTime.fromISO("12:00:00") }, #{ start: plainTime.fromISO("13:00:00"), end: plainTime.fromISO("17:00:00") }]
})
model AvailabilityRuleWrite {
    /** 0 = Monday, 6 = Sunday */
    weekday: Weekday;

    periods: TimeRange[];
}

@example(#{
    ownerId: "usr_01J8KZPX3N",
    date: plainDate.fromISO("2026-07-04"),
    periods: #[]
})
model AvailabilityOverride {
    ownerId: string;

    /** ISO 8601 date, must be today or in the future */
    date: plainDate;

    periods: TimeRange[];
}

@example(#{ date: plainDate.fromISO("2026-07-04"), periods: #[] })
model AvailabilityOverrideCreate {
    /** ISO 8601 date, must be today or in the future */
    date: plainDate;

    periods: TimeRange[];
}

@example(#{ periods: #[#{ start: plainTime.fromISO("10:00:00"), end: plainTime.fromISO("14:00:00") }] })
model AvailabilityOverrideUpdate {
    periods: TimeRange[];
}
