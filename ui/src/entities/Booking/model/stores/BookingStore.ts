import { makeAutoObservable, runInAction } from 'mobx';
import { bookingApi } from '../../api/bookingApi';
import type { Booking } from '../types/types';

export class BookingStore {
  bookings: Booking[] = [];
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchAll(): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      const data = await bookingApi.fetchAll();
      runInAction(() => {
        this.bookings = data;
        this.isLoading = false;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : 'Unknown error';
        this.isLoading = false;
      });
    }
  }
}
