import type { ReactElement, ReactNode } from 'react';
import { rootStore } from '../config/RootStore';
import { RootStoreContext } from '../config/RootStoreContext';

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps): ReactElement => (
  <RootStoreContext.Provider value={rootStore}>
    {children}
  </RootStoreContext.Provider>
);
