//TODO: to be refactored during the Discord login story
import React, { createContext, PropsWithChildren } from 'react';
import { UserContextType } from '@/types/userContextType';

export const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // const { data: user } = useQuery({
  //   queryKey: ['discord-user'],
  //   queryFn: () => {
  //     return AUTH_UserReadController_getUser();
  //   },
  // });

  // if (!user) return <OnBoarding />;
  const userDummy = {
    discordId: '123',
    username: 'Test',
    factions: ['Alliance'],
    highestRole: 'TestRole',
    displayName: 'Test',
    characters: [],
  };

  return <UserContext.Provider value={userDummy}>{children}</UserContext.Provider>;
};
