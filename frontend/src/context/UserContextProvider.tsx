import React, { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '../services/userService';
import { UserContext } from './userContexts';

const fetchUser = () => getUser();

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    retry: false,
  });

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
