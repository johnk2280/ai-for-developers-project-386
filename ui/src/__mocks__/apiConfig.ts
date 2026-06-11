export const baseURL = 'http://localhost:8000';
export const TIMEOUT = 30000;

export const apiEndpoints = {
  OWNERS: '/v1/owners',
  EVENT_TYPES: '/v1/event-types',
  SCHEDULES: '/v1/schedules',
  BOOKINGS: '/v1/bookings',
  MEETING_PLATFORMS: '/v1/meeting-platforms',
} as const;
