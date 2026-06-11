import { EventTypeStore } from '@entities/EventType';
import { OwnerStore } from '@entities/Owner';
import { BookingStore } from '@entities/Booking';
import { ScheduleStore } from '@entities/Schedule';
import { MeetingPlatformStore } from '@entities/MeetingPlatform';

export class RootStore {
  eventTypes = new EventTypeStore();
  owners = new OwnerStore();
  bookings = new BookingStore();
  schedules = new ScheduleStore();
  meetingPlatforms = new MeetingPlatformStore();
}

export const rootStore = new RootStore();
