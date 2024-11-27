import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { RootLayout } from './layout/AppLayout';
import { Home } from './pages/home/Home';
import React from 'react';
import { PlayerInfo } from '@/layout/toolbar/player-info/PlayerInfo';
import DemoPage from '@/layout/toolbar/characters/demo-page/DemoPage';

const AppRoutes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/user-info',
        element: <PlayerInfo></PlayerInfo>,
      },
      {
        path: '/characters',
        element: <DemoPage></DemoPage>,
      },
      //
      // {
      //     path: '*',
      //     element: <Error404Page />,
      // },
    ],
  },
];

export const router = createBrowserRouter(AppRoutes);
