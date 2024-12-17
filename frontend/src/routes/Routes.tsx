import AppLayout from '@/layouts/AppLayout';
import DemoPage from '@/pages/DemoPage';
import { Home } from '@/pages/Home';
import React from 'react';
import { RouteObject } from 'react-router-dom';

export const Routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/demo',
        element: <DemoPage></DemoPage>,
      },
    ],
  },
];
