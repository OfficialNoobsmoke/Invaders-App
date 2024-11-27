import { IconType } from 'react-icons';
import React from 'react';

export type DetailHeaderProps = {
  title?: React.ReactNode;
  icon?: IconType;
  subtitle?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
};

export const DetailHeader: React.FC<DetailHeaderProps> = (props) => {
  return (
    <div className={`border-b p-3 sm:px-6 ${props.className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-row items-center gap-3">
          {/*{props.icon && (*/}
          {/*  <IconBadge*/}
          {/*    color={props.iconColor}*/}
          {/*    icon={props.icon}*/}
          {/*  />*/}
          {/*)}*/}
          <div>
            <div className="text-base font-semibold leading-6">{props.title}</div>
            <div className="text-sm text-secondary">{props.subtitle}</div>
          </div>
        </div>
        <div className="ml-auto flex flex-col justify-end gap-1 md:flex-row">{props.children}</div>
      </div>
    </div>
  );
};
