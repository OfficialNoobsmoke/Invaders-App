import React from 'react';
import { useResetScrollOnNavigation } from './hooks/useResetScrollOnNavigation';
import { Toolbar } from '@/layout/toolbar/Toolbar';
import { Outlet } from 'react-router-dom';
import { LeftSidePanel } from '@/layout/left-panel/LeftSidePanel';

const Layout: React.FC = () => {
  const scrollableElement = useResetScrollOnNavigation();

  return (
    <div className="overflow-y-auto overflow-x-hidden" ref={scrollableElement}>
      <div className="fixed top-0 z-10 w-full bg-card">
        <Toolbar />
      </div>
      <div className="fixed left-0 top-0 h-full w-14 bg-card border-r flex flex-col justify-between">
        <div className="flex flex-col items-center mt-auto mb-4">
          <LeftSidePanel />
        </div>
      </div>
      <div
        className="relative flex size-full min-h-screen max-w-[94vw] grow flex-col overflow-x-hidden pb-24 pt-16 md:pb-0 lg:pt-20"
        style={{ marginLeft: '5rem' }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;