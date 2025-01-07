import { createContext } from 'react';
import { AuthContextType } from '../interfaces/authenticationContextType';

export const AuthenticationContext = createContext<AuthContextType | undefined>(undefined);
