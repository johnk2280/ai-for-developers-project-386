namespace CallCalendar;

@example(#{
    id: "et_30min",
    name: "30-Minute Call",
    description: "A quick sync to discuss your project needs.",
    duration: 30
})
model EventType {
    id: string;
    name: string;
    description: string;

    /** Positive integer, multiple of 15 minutes */
    duration: integer;
}

@example(#{
    name: "30-Minute Call",
    description: "A quick sync to discuss your project needs.",
    duration: 30
})
model EventTypeCreate {
    name: string;
    description: string;

    /** Positive integer, multiple of 15 minutes */
    duration: integer;
}

@example(#{ name: "30-Minute Call", duration: 30 })
model EventTypeUpdate {
    name?: string;
    description?: string;

    /** Positive integer, multiple of 15 minutes */
    duration?: integer;
}
