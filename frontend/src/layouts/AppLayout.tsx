import { CustomErrorBoundary } from '../features/CustomErrorBoundary';
import Login from '../pages/Login';
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Outlet } from 'react-router-dom';
import Home from '@/pages/Home';

export default function AppLayout() {
  const { username } = useContext(UserContext);

  return (
    <CustomErrorBoundary>
      {username ? <Home /> : <Login />} <Outlet />
    </CustomErrorBoundary>
  );
}
