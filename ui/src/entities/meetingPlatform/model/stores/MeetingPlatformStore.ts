import { makeAutoObservable, runInAction } from 'mobx';
import { meetingPlatformApi } from '../../api/meetingPlatformApi';
import type { MeetingPlatform } from '../types/types';

export class MeetingPlatformStore {
  platforms: MeetingPlatform[] = [];
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchAll(): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      const data = await meetingPlatformApi.fetchAll();
      runInAction(() => {
        this.platforms = data;
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
