namespace CallCalendar;

model Owner {
    id: string;
    name: string;
    username: string;
    email: string;
    timezone: string;
}

model OwnerCreate {
    name: string;
    username: string;
    email: string;
    timezone: string;
}

model OwnerUpdate {
    name?: string;
    username?: string;
    email?: string;
    timezone?: string;
}
