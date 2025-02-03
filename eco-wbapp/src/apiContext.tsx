// src/context/ApiContext.tsx
import React, { createContext, useContext, useMemo } from 'react';
import { EcoWebClient } from './EcoWebClient';

export const ApiContext = createContext<EcoWebClient | null>(null);

export function ApiProvider({ children }: { children: React.ReactNode }) {
  const apiClient = useMemo(() => new EcoWebClient(), []);

  return (
    <ApiContext.Provider value={apiClient}>{children}</ApiContext.Provider>
  );
}

// Create a hook for easy access to the context
export function useApi() {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
}
