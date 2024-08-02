import React, { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { hideSplashScreen } from '../../helpers/SplashScreenService';


type AuthenticationContextType = {
  isAuthenticated: boolean
  discordId: string
  username: string
}


export const UserContext = createContext<AuthenticationContextType>({} as AuthenticationContextType);

export const UserContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {

  const [user, setUser] = useState<{ discordId?: string; username?: string } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/auth/discord/user", {
          credentials: "include",
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking authentication status:", error);
        setIsAuthenticated(false);
      }
    };
    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (user) {
      hideSplashScreen();
    }
  }, [user]);

  if (!isAuthenticated && !user) return <></>;

  return (
    <UserContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        discordId: user?.discordId || '',
        username: user?.username || '',
      }}
    >
      {children}
    </UserContext.Provider>
  );
};