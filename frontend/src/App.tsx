import "./App.css";
import { useDetectConnection } from "./helpers/useDetectConnection.tsx";
import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./AppRoutes.tsx";
import { AnimatePresence } from "framer-motion";

const App: React.FC = () => {
  useDetectConnection();

  return (
    // <IdentitateContextProvider>
    <AnimatePresence mode="wait">
      <RouterProvider router={router} />
    </AnimatePresence>
    // </IdentitateContextProvider>
  );
};

export default App;
