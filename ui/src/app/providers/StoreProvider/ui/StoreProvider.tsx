import type { ReactNode } from 'react';
import { rootStore } from '../config/RootStore';
import { RootStoreContext } from '../config/RootStoreContext';

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => (
  <RootStoreContext.Provider value={rootStore}>
    {children}
  </RootStoreContext.Provider>
);
