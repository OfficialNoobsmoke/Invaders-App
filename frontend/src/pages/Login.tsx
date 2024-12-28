import React from 'react';
import ButtonWrapper from '../components/common/ButtonWrapper';
import { useMutation, useQuery } from '@tanstack/react-query';
import { logout } from '../services/authenticationService';
import { AxiosError } from 'axios';
import { buildRouteUrl } from '../utils/urlBuildRouter';
import { apiRoutes } from '../constants/constants';
import { getUsers } from '../services/userService';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigator = useNavigate();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    enabled: false,
    retry: false,
  });

  const useLogout = () => {
    return useMutation({
      mutationFn: logout,
      onSuccess: () => {
        navigator('/');
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
    window.location.href = buildRouteUrl(apiRoutes.LOGIN);
  };

  const handleGetUsers = () => {
    refetch();
  };

  return (
    <div>
      <h3>Welcome to Invaders</h3>
      <ButtonWrapper onClick={handleLoginClick}>Login with Discord</ButtonWrapper>
      <ButtonWrapper onClick={handleLogout}>Logout</ButtonWrapper>
      <ButtonWrapper onClick={handleGetUsers}>Get Users</ButtonWrapper>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching users.</p>}
      {data && (
        <ul>
          {data.map((user) => (
            <li key={user.id}>{user.displayName}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
