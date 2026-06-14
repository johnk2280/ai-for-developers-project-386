import { makeAutoObservable, runInAction } from 'mobx';
import { ownerApi } from '../../api/ownerApi';
import type { Owner } from '../types/types';

export class OwnerStore {
    owners: Owner[] = [];
    isLoading = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchAll(): Promise<void> {
        this.isLoading = true;
        this.error = null;
        try {
            const data = await ownerApi.fetchAll();
            runInAction(() => {
                this.owners = data;
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
