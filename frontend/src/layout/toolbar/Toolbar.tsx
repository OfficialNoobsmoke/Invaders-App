import React from "react";
import { UserMenu } from './user-menu/User.menu';
import { ThemeConfig } from '../../storybook/theme-config/ThemeConfig';

export const Toolbar: React.FC = () => {
  const classes =
    "font-semibold rounded-lg hover:bg-neutral transition text-secondary py-2 px-4 h-full flex flex-row gap-3 items-center";
  const activeClasses = "bg-primary text-primary-foreground hover:bg-primary";

  return (
    <div className="border-b bg-card px-4 pr-6">
      <div className="flex h-16 w-full items-center justify-between">
        <div className={'flex items-center gap-2'}>
          {/*<Logo />*/}
          {/*<div className={'ml-20 hidden items-center gap-4 lg:flex'}>*/}
          {/*  <NavLink*/}
          {/*    className={({ isActive }) => twMerge(classes, isActive ? activeClasses : '')}*/}
          {/*    to="/entitate-juridica">*/}
          {/*    <ThemeIcons.Building2 className={'text-lg'} />*/}
          {/*    Entități juridice*/}
          {/*  </NavLink>*/}
          {/*  <NavLink*/}
          {/*    className={({ isActive }) => twMerge(classes, isActive ? activeClasses : '')}*/}
          {/*    to="/proiect">*/}
          {/*    <LuFolderTree className={'text-lg'} />*/}
          {/*    Proiecte*/}
          {/*  </NavLink>*/}
          {/*  <NavLink*/}
          {/*    className={({ isActive }) => twMerge(classes, isActive ? activeClasses : '')}*/}
          {/*    to="/achizitie">*/}
          {/*    <FaAcquisitionsIncorporated className={'text-lg'} />*/}
          {/*    Achiziții*/}
          {/*  </NavLink>*/}
          {/*</div>*/}
        </div>
        <div className="flex items-center gap-3">
          {/*<CustomEnvironmentChip />*/}

          {/*<ThemeConfig*/}
          {/*  variant={'outline'}*/}
          {/*  isIconOnly={true}*/}
          {/*/>*/}
          <ThemeConfig
            variant={'outline'}
            isIconOnly={true}
          />
          <UserMenu />
          {/*<NotificariMenu />*/}
        </div>
      </div>
    </div>
  );
};
