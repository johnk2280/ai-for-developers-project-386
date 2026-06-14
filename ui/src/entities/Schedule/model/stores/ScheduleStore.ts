import { makeAutoObservable, runInAction } from 'mobx';
import { scheduleApi } from '../../api/scheduleApi';
import type {
    AvailabilityRule,
    AvailabilityRuleWrite,
    AvailabilityOverride,
    AvailabilityOverrideCreate,
} from '../types/types';

export class ScheduleStore {
    rules: AvailabilityRule[] = [];
    overrides: AvailabilityOverride[] = [];
    isLoadingRules = false;
    isLoadingOverrides = false;
    isSaving = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchRules(ownerId: string): Promise<void> {
        this.isLoadingRules = true;
        this.error = null;
        try {
            const data = await scheduleApi.fetchRules(ownerId);
            runInAction(() => {
                this.rules = data;
                this.isLoadingRules = false;
            });
        } catch (e) {
            runInAction(() => {
                this.error = e instanceof Error ? e.message : 'Unknown error';
                this.isLoadingRules = false;
            });
        }
    }

    async replaceRules(ownerId: string, payload: AvailabilityRuleWrite[]): Promise<void> {
        this.isSaving = true;
        try {
            const updated = await scheduleApi.replaceRules(ownerId, payload);
            runInAction(() => {
                this.rules = updated;
                this.isSaving = false;
            });
        } catch (e) {
            runInAction(() => {
                this.error = e instanceof Error ? e.message : 'Unknown error';
                this.isSaving = false;
            });
        }
    }

    async fetchOverrides(ownerId: string): Promise<void> {
        this.isLoadingOverrides = true;
        this.error = null;
        try {
            const data = await scheduleApi.fetchOverrides(ownerId);
            runInAction(() => {
                this.overrides = data;
                this.isLoadingOverrides = false;
            });
        } catch (e) {
            runInAction(() => {
                this.error = e instanceof Error ? e.message : 'Unknown error';
                this.isLoadingOverrides = false;
            });
        }
    }

    async createOverride(ownerId: string, payload: AvailabilityOverrideCreate): Promise<void> {
        this.isSaving = true;
        try {
            const created = await scheduleApi.createOverride(ownerId, payload);
            runInAction(() => {
                this.overrides.push(created);
                this.isSaving = false;
            });
        } catch (e) {
            runInAction(() => {
                this.error = e instanceof Error ? e.message : 'Unknown error';
                this.isSaving = false;
            });
        }
    }

    async deleteOverride(ownerId: string, date: string): Promise<void> {
        try {
            await scheduleApi.deleteOverride(ownerId, date);
            runInAction(() => {
                this.overrides = this.overrides.filter((o) => o.date !== date);
            });
        } catch (e) {
            runInAction(() => {
                this.error = e instanceof Error ? e.message : 'Unknown error';
            });
        }
    }
}
