namespace CallCalendar;

@example(#{ id: "plt_zoom", name: "Zoom", baseUrl: "https://zoom.us/j/" })
model MeetingPlatform {
    id: string;
    name: string;
    baseUrl: string;
}

@example(#{ name: "Zoom", baseUrl: "https://zoom.us/j/" })
model MeetingPlatformCreate {
    name: string;
    baseUrl: string;
}

@example(#{ name: "Zoom" })
model MeetingPlatformUpdate {
    name?: string;
    baseUrl?: string;
}
