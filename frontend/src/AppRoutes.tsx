import { createBrowserRouter, RouteObject } from "react-router-dom";
import { OnBoarding } from "./pages/onboarding/OnBoarding";
import React from "react";

const AppRoutes: RouteObject[] = [
  {
    path: "/",
    element: <OnBoarding />,
    children: [
      // {
      //     path: '/home',
      //     element: <Home />,
      // },
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
