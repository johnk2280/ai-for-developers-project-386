import { makeAutoObservable, runInAction } from 'mobx';
import { eventTypeApi } from '../../api/eventTypeApi';
import type { EventType } from '../types/types';

export class EventTypeStore {
  eventTypes: EventType[] = [];
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchAll(): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      const data = await eventTypeApi.fetchAll();
      runInAction(() => {
        this.eventTypes = data;
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
