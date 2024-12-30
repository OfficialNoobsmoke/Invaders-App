import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthenticationContext } from '../context/authenticationContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const authContext = useContext(AuthenticationContext);

  if (!authContext || !authContext.isLoggedIn) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return <>{children}</>;
};
