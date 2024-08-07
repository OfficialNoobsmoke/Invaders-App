import React, { createContext, PropsWithChildren, useEffect } from 'react';
import { hideSplashScreen } from '../../helpers/SplashScreenService';
import { OnBoarding } from '../../pages/onboarding/OnBoarding';
import { useQuery } from '@tanstack/react-query';
import { AUTH_UserReadController_getUser } from '../../clients/auth/AUTH_UserReadController_findUser';


type AuthenticationContextType = {
  discordId: string
  username: string
  factions: string[]
  highestRole: string
}


export const UserContext = createContext<AuthenticationContextType>({} as AuthenticationContextType);

export const UserContextProvider: React.FC<PropsWithChildren> = ({ children }) => {


  const { data: user } = useQuery({
    queryKey: ['discord-user'],
    queryFn: () => {
      return AUTH_UserReadController_getUser();
    },
  });


  useEffect(() => {
    if (user) {
      hideSplashScreen();
    }
  }, [user]);

  if (!user) return <OnBoarding />;

  return (
    <UserContext.Provider
      value={{
        discordId: user?.discordId,
        username: user?.username,
        factions: user?.factions,
        highestRole: user?.highestRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};