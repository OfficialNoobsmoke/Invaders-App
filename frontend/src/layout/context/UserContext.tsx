import React, { createContext, PropsWithChildren, useEffect } from 'react';
import { hideSplashScreen } from '../../helpers/SplashScreenService';
import { OnBoarding } from '../../pages/onboarding/OnBoarding';
import { useQuery } from '@tanstack/react-query';
import { AUTH_UserReadController_getUser, CharacterDto } from '../../clients/auth/AUTH_UserReadController_findUser';


type UserContextType = {
  discordId: string;
  username: string;
  factions: string[];
  highestRole: string;
  displayName: string | undefined;
  characters: CharacterDto[] | undefined;
}


export const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserContextProvider: React.FC<PropsWithChildren> = ({ children }) => {


  const { data: user } = useQuery({
    queryKey: ['discord-user'],
    queryFn: () => {
      return AUTH_UserReadController_getUser();
    },
  });


  // useEffect(() => {
  //   if (user) {
  //     hideSplashScreen();
  //   }
  // }, [user]);

  // if (!user) return <OnBoarding />;
  const userDummy = {
    discordId: "123",
    username: "Test",
    factions: ["Alliance"],
    highestRole: "TestRole",
    displayName: "Test",
    characters: [],
  }

  return (
    <UserContext.Provider
      value={userDummy}
    >
      {children}
    </UserContext.Provider>
  );
};