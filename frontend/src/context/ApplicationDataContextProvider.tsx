import React, { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getApplicationData } from '../services/applicationDataService';
import { ApplicationDataContext } from './applicationDataContexts';

export const ApplicationDataContextProvider = ({ children }: { children: ReactNode }) => {
  const { data: appData } = useQuery({
    queryKey: ['applicationData'],
    queryFn: () => getApplicationData(),
    retry: false,
  });

  return <ApplicationDataContext.Provider value={appData}>{children}</ApplicationDataContext.Provider>;
};
