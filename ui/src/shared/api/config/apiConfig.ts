export const baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:4010';
export const TIMEOUT = 30000;

export const apiEndpoints = {
    OWNERS: '/v1/owners',
    EVENT_TYPES: '/v1/event-types',
    MEETING_PLATFORMS: '/v1/meeting-platforms',
    ownerSchedule: (ownerId: string) => `/v1/owners/${ownerId}/schedule`,
    ownerBookings: (ownerId: string) => `/v1/owners/${ownerId}/schedule/bookings`,
    ownerBooking: (ownerId: string, id: string) => `/v1/owners/${ownerId}/schedule/bookings/${id}`,
    ownerRules: (ownerId: string) => `/v1/owners/${ownerId}/schedule/rules`,
    ownerOverrides: (ownerId: string) => `/v1/owners/${ownerId}/schedule/overrides`,
    ownerOverride: (ownerId: string, date: string) => `/v1/owners/${ownerId}/schedule/overrides/${date}`,
} as const;
