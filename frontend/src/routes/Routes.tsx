import AppLayout from '@/layouts/AppLayout';
import DemoPage from '@/pages/DemoPage';
import React from 'react';
import { RouteObject } from 'react-router-dom';
import Login from '../pages/Login';
import Characters from '../pages/Characters';
import Home from '../pages/Home';
import NotInDiscord from '../pages/NotInDiscord';
import Profile from '../pages/Profile';

export const Routes: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/not-in-discord',
        element: <NotInDiscord />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/characters',
        element: <Characters />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/demo',
        element: <DemoPage />,
      },
    ],
  },
];
