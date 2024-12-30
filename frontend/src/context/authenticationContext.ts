import { createContext } from 'react';
import { AuthContextType } from '../interfaces/IAuthenticationContextType';

export const AuthenticationContext = createContext<AuthContextType | undefined>(undefined);
