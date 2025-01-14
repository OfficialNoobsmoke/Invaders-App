import React, { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '../services/userService';
import { UserContext } from './userContexts';

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
    retry: false,
  });
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
