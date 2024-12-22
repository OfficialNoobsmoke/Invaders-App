import AppLayout from '@/layouts/AppLayout';
import DemoPage from '@/pages/DemoPage';
import Home from '@/pages/Home';
import React from 'react';
import { RouteObject } from 'react-router-dom';
import Login from '../pages/Login';

export const Routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/demo',
        element: <DemoPage />,
      },
    ],
  },
];
