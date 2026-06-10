namespace CallCalendar;

model EventType {
    id: string;
    name: string;
    description: string;

    /** Positive integer, multiple of 15 minutes */
    duration: integer;
}

model EventTypeCreate {
    name: string;
    description: string;

    /** Positive integer, multiple of 15 minutes */
    duration: integer;
}

model EventTypeUpdate {
    name?: string;
    description?: string;

    /** Positive integer, multiple of 15 minutes */
    duration?: integer;
}
