import { createContext } from 'react';
import { UserContextType } from '@/types/userContextType';

export const UserContext = createContext<UserContextType | undefined>(undefined);
