import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { RootLayout } from './layout/AppLayout';
import { Home } from './pages/home/Home';
import React from 'react';

const AppRoutes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      // {
      //     path: '/notificare',
      //     element: <ListaNotificari />,
      // },
      //
      // {
      //     path: '*',
      //     element: <Error404Page />,
      // },
    ],
  },
];

export const router = createBrowserRouter(AppRoutes);
