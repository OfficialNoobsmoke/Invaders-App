import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { RootLayout } from './layout/AppLayout';
import { Home } from './pages/home/Home';
import React from 'react';
import { PlayerInfo } from '@/layout/toolbar/player-info/PlayerInfo';
import { PlayerCharacters } from '@/layout/toolbar/characters/PlayerCharacters';

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
        element: <PlayerCharacters></PlayerCharacters>,
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
