namespace CallCalendar;

@example(#{
    id: "usr_01J8KZPX3N",
    name: "Alex Johnson",
    username: "alexj",
    email: "alex.johnson@example.com",
    timezone: "Europe/London"
})
model Owner {
    id: string;
    name: string;
    username: string;
    email: string;
    timezone: string;
}

@example(#{
    name: "Alex Johnson",
    username: "alexj",
    email: "alex.johnson@example.com",
    timezone: "Europe/London"
})
model OwnerCreate {
    name: string;
    username: string;
    email: string;
    timezone: string;
}

@example(#{ name: "Alex Johnson", email: "alex.johnson@example.com" })
model OwnerUpdate {
    name?: string;
    username?: string;
    email?: string;
    timezone?: string;
}
