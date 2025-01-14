import { createContext } from 'react';
import { ApplicationDataContextType } from '../types/applicationDataContextType';

export const ApplicationDataContext = createContext<ApplicationDataContextType | undefined>(undefined);
