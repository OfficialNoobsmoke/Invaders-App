import { CustomErrorBoundary } from '../features/CustomErrorBoundary';
import React from 'react';
import { NavigationBar } from '../features/NavigationBar';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <CustomErrorBoundary>
      <NavigationBar />
      <Outlet />
    </CustomErrorBoundary>
  );
}
