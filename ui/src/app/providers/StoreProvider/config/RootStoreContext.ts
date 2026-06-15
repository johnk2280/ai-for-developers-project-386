import { createContext, useContext } from 'react';
import type { RootStore } from './RootStore';

export const RootStoreContext = createContext<RootStore | null>(null);

export function useStore(): RootStore {
    const store = useContext(RootStoreContext);
    if (!store) throw new Error('useStore must be used inside StoreProvider');
    return store;
}
