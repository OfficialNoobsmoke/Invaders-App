import { useLocation } from 'react-router-dom';
import NavigationBarWrapper from '../components/common/NavigationBarWrapper';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContexts';
import { AxiosError } from 'axios';
import { logout } from '../services/authenticationService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const NavigationBar = () => {
  const user = useContext(UserContext);
  const location = useLocation();
  const navigator = useNavigate();

  const queryClient = useQueryClient();

  const navBarPaths = ['/home', '/characters', '/profile', '/character-details', '/raid-schedule'];
  const shouldShowNavBar = navBarPaths.includes(location.pathname);

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authentication'] });
    },
    onError: (error: AxiosError) => {
      console.error('Logout failed:', error.response?.data || error.message);
    },
  });

  const handleMenuItemClick = (menuItem: { id: number; label: string }) => {
    const functions: Record<number, () => void> = {
      1: handleProfile,
      2: handleLogout,
    };

    if (!functions[menuItem.id]) {
      console.error(`No action defined for menu item ID: ${menuItem.id}`);
      return;
    }

    functions[menuItem.id]?.();
  };

  const handleProfile = () => {
    navigator('/profile');
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    shouldShowNavBar && (
      <NavigationBarWrapper
        title="Invaders"
        links={[
          { label: 'Home', path: '/home' },
          { label: 'Characters', path: '/characters' },
          { label: 'Raid Schedule', path: '/raid-schedule' },
        ]}
        menuItems={[
          { id: 1, label: 'Profile' },
          { id: 2, label: 'Logout' },
        ]}
        onMenuItemClick={handleMenuItemClick}
        profileImageUrl={user?.profileImageUrl}
      />
    )
  );
};
