import React, { createContext, useContext } from 'react';
import { EcoWebClient } from './EcoWebClient';

const ApiContext = createContext(new EcoWebClient());

export default function ApiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const apiClient = new EcoWebClient();

  return (
    <ApiContext.Provider value={apiClient}>{children}</ApiContext.Provider>
  );
}

export function useApi() {
  return useContext(ApiContext);
}
