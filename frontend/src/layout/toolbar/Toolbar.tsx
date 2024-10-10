import React from 'react';
import { UserMenu } from '@/layout/toolbar/user-menu/User.menu';
import { Logo } from '@/logo/Logo';


export const Toolbar: React.FC = () => {

  return (
    <div className="flex border-b pr-2 items-end justify-between">
      <Logo />
      <div className="items-center justify-end mt-2 mb-2">
        <UserMenu>
        </UserMenu>
      </div>
    </div>
  );
};
