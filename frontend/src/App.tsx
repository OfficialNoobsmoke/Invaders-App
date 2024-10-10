import { useDetectConnection } from './helpers/useDetectConnection';
import { RouterProvider } from 'react-router-dom';
import { router } from './AppRoutes';
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { UserContextProvider } from './layout/context/UserContext';
import { ThemeProvider } from '@/layout/theme/ThemeProvider';

const App: React.FC = () => {
  useDetectConnection();
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <UserContextProvider>
        <AnimatePresence mode="wait">
          <RouterProvider router={router} />
        </AnimatePresence>
      </UserContextProvider>
    </ThemeProvider>


  );
};

export default App;
