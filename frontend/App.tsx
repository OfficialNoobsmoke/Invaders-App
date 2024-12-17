import { RouterProvider } from 'react-router-dom';
import { router } from './src/routes/Router';
import React from 'react';
import { UserContextProvider } from './src/context/UserContext';

const App: React.FC = () => {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
};

export default App;
