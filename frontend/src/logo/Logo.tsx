import React from 'react';
import { NavLink } from 'react-router-dom';
import logo_light from '@/logo/logo_light.svg';
import logo_dark from '@/logo/logo_dark.svg';
import { useTheme } from '@/layout/theme/ThemeProvider';

export const Logo: React.FC = () => {
  const { theme } = useTheme();
  return (
    <NavLink
      to={'/home'}
      className="flex shrink-0 items-center">
      <img src={theme === 'light' ? logo_dark : logo_light} alt="Invaders Logo"
           style={{ width: '150px', height: 'auto' }} />
    </NavLink>
  );
};
