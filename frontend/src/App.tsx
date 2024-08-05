import { useDetectConnection } from './helpers/useDetectConnection';
import { RouterProvider } from 'react-router-dom';
import { router } from './AppRoutes';
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { UserContextProvider } from './layout/context/UserContext';

const App: React.FC = () => {
  useDetectConnection();

  return (
    <UserContextProvider>
     <AnimatePresence mode="wait">
       <RouterProvider router={router} />
      </AnimatePresence>
    </UserContextProvider>

  );
};

export default App;
