import { EventTypeStore } from '@entities/eventType';
import { OwnerStore } from '@entities/owner';
import { BookingStore } from '@entities/booking';
import { ScheduleStore } from '@entities/schedule';
import { MeetingPlatformStore } from '@entities/meetingPlatform';

export class RootStore {
  eventTypes = new EventTypeStore();
  owners = new OwnerStore();
  bookings = new BookingStore();
  schedules = new ScheduleStore();
  meetingPlatforms = new MeetingPlatformStore();
}

export const rootStore = new RootStore();
