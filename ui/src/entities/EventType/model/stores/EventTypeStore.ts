import { makeAutoObservable, runInAction } from 'mobx';
import { eventTypeApi } from '../../api/eventTypeApi';
import type { EventType, EventTypeCreate, EventTypeUpdate } from '../types/types';

export class EventTypeStore {
    eventTypes: EventType[] = [];
    isLoading = false;
    isSaving = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    clearError(): void {
        this.error = null;
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

    async create(payload: EventTypeCreate): Promise<void> {
        this.isSaving = true;
        this.error = null;
        try {
            const created = await eventTypeApi.create(payload);
            runInAction(() => {
                this.eventTypes.push(created);
                this.isSaving = false;
            });
        } catch (e) {
            runInAction(() => {
                this.error = e instanceof Error ? e.message : 'Unknown error';
                this.isSaving = false;
            });
        }
    }

    async update(id: string, payload: EventTypeUpdate): Promise<void> {
        this.isSaving = true;
        this.error = null;
        try {
            const updated = await eventTypeApi.update(id, payload);
            runInAction(() => {
                const idx = this.eventTypes.findIndex((et) => et.id === id);
                if (idx !== -1) this.eventTypes[idx] = updated;
                this.isSaving = false;
            });
        } catch (e) {
            runInAction(() => {
                this.error = e instanceof Error ? e.message : 'Unknown error';
                this.isSaving = false;
            });
        }
    }

    async remove(id: string): Promise<void> {
        try {
            await eventTypeApi.remove(id);
            runInAction(() => {
                const index = this.eventTypes.findIndex((et) => et.id === id);
                if (index !== -1) this.eventTypes.splice(index, 1);
            });
        } catch (e) {
            runInAction(() => {
                this.error = e instanceof Error ? e.message : 'Unknown error';
            });
        }
    }
}
