namespace CallCalendar;

model MeetingPlatform {
    id: string;
    name: string;
    baseUrl: string;
}

model MeetingPlatformCreate {
    name: string;
    baseUrl: string;
}

model MeetingPlatformUpdate {
    name?: string;
    baseUrl?: string;
}
