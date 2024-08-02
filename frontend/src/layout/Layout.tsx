import React from "react";
import { Toolbar } from "./toolbar/Toolbar";
import { Outlet } from "react-router-dom";
import { useResetScrollOnNavigation } from "./hooks/useResetScrollOnNavigation";

const Layout: React.FC = () => {
  const scrollableElement = useResetScrollOnNavigation();

  return (
    <div className="overflow-y-auto overflow-x-hidden" ref={scrollableElement}>
      <div className="fixed top-0 z-10 w-full bg-card">
        <Toolbar />
      </div>

      <div className="relative flex size-full min-h-screen max-w-[100vw] grow flex-col overflow-x-hidden pb-24 pt-16 md:pb-0 lg:pt-28">
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
