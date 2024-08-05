import React, { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { hideSplashScreen } from '../../helpers/SplashScreenService';
import { OnBoarding } from '../../pages/onboarding/OnBoarding';
import { useQuery } from '@tanstack/react-query';
import { AUTH_UserReadController_getUser } from '../../clients/auth/AUTH_UserReadController_findUser';


type AuthenticationContextType = {
  discordId: string
  username: string
}


export const UserContext = createContext<AuthenticationContextType>({} as AuthenticationContextType);

export const UserContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };

  const AuthCookie = getCookie("user_data");


  const { data: user } = useQuery({
    queryKey: ['discord-user'],
    queryFn: () => {
      return AUTH_UserReadController_getUser();
    },
  });

  useEffect(() => {
    if (user && AuthCookie) {
      hideSplashScreen();
    }
  }, [user,AuthCookie]);

  if (!user && !AuthCookie) return <OnBoarding/>;

  return (
    <UserContext.Provider
      value={{
        discordId: user?.discordId || '',
        username: user?.username || '',
      }}
    >
      {children}
    </UserContext.Provider>
  );
};