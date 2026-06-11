import { makeAutoObservable, runInAction } from 'mobx';
import { scheduleApi } from '../../api/scheduleApi';
import type { Schedule } from '../types/types';

export class ScheduleStore {
  schedule: Schedule | null = null;
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchByOwner(ownerId: string): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      const data = await scheduleApi.fetchByOwner(ownerId);
      runInAction(() => {
        this.schedule = data;
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
