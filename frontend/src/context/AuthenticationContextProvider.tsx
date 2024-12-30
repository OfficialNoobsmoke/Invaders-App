import { useQuery } from '@tanstack/react-query';
import { FC, ReactNode } from 'react';
import { check } from '../services/authenticationService';
import { AuthenticationContext } from './authenticationContext';
import React from 'react';

export const AuthenticationContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['authentication'],
    queryFn: check,
    retry: false,
    staleTime: import.meta.env.REACT_APP_CACHE_TIME,
    refetchOnWindowFocus: false,
  });

  const isLoggedIn = !!data;

  if (isLoading) return null;

  return <AuthenticationContext.Provider value={{ isLoggedIn }}>{children}</AuthenticationContext.Provider>;
};
