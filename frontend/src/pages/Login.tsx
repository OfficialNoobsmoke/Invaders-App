import React from 'react';
import ButtonWrapper from '../components/common/ButtonWrapper';
import { useMutation } from '@tanstack/react-query';
import { logout } from '../services/authenticationService';
import { AxiosError } from 'axios';
import { buildRouteUrl } from '../utils/urlBuildRouter';
import { apiRoutes } from '../constants/constants';

export default function Login() {
  const useLogout = () => {
    return useMutation({
      mutationFn: logout,
      onSuccess: () => {
        localStorage.removeItem('user');
        window.location.href = '/login';
      },
      onError: (error: AxiosError) => {
        console.error('Logout failed:', error.response?.data || error.message);
      },
    });
  };

  const logoutMutation = useLogout();
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const handleLoginClick = () => {
    window.open(buildRouteUrl(apiRoutes.LOGIN));
  };

  return (
    <div>
      <h3>Welcome to Invaders Web Application</h3>
      <ButtonWrapper onClick={handleLoginClick}>Login with Discord</ButtonWrapper>
      <ButtonWrapper onClick={handleLogout}>Logout</ButtonWrapper>
    </div>
  );
}
