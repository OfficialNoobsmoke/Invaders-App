import React, { useMemo } from 'react';
import { IconType } from 'react-icons';
import { cva } from 'class-variance-authority';
import { Color, Size, TailwindColor } from '../theme-icons/ThemeConstants';
import { classNames } from '../theme-icons/classNames';

type IconBadgeProps = {
  color?: Color | TailwindColor;
  size?: Size;
  icon: IconType;
};

const iconBadgeVariants = cva(
  'pointer-events-none inline-flex aspect-square select-none  items-center justify-center rounded-md',
  {
    variants: {
      color: {
        primary: 'bg-primary text-primary-foreground',
        danger: 'bg-danger text-danger-foreground',
        warning: 'bg-warning text-white',
        success: 'bg-success text-white',
        neutral: 'bg-neutral text-neutral-foreground ring-1 ring-neutral-foreground/20',

        slate: 'bg-slate-600 text-white dark:bg-slate-500',
        gray: 'bg-gray-600 text-white dark:bg-gray-500',
        stone: 'bg-stone-600 text-white dark:bg-stone-500',
        red: 'bg-red-600 text-white dark:bg-red-500',
        orange: 'bg-orange-600 text-white dark:bg-orange-500',
        amber: 'bg-amber-600 text-white dark:bg-amber-500',
        yellow: 'bg-yellow-600 text-white dark:bg-yellow-500',
        lime: 'bg-lime-600 text-white dark:bg-lime-500',
        green: 'bg-green-600 text-white dark:bg-green-500',
        emerald: 'bg-emerald-600 text-white dark:bg-emerald-500',
        teal: 'bg-teal-600 text-white dark:bg-teal-500',
        cyan: 'bg-cyan-600 text-white dark:bg-cyan-500',
        sky: 'bg-sky-600 text-white dark:bg-sky-500',
        blue: 'bg-blue-600 text-white dark:bg-blue-500',
        indigo: 'bg-indigo-600 text-white dark:bg-indigo-500',
        violet: 'bg-violet-600 text-white dark:bg-violet-500',
        purple: 'bg-purple-600 text-white dark:bg-purple-500',
        fuchsia: 'bg-fuchsia-600 text-white dark:bg-fuchsia-500',
        pink: 'bg-pink-600 text-white dark:bg-pink-500',
        rose: 'bg-rose-600 text-white dark:bg-rose-500',
        zinc: 'bg-zinc-600 text-white dark:bg-zinc-500',
      },
      size: {
        sm: 'p-1.5',
        md: 'p-2',
        lg: 'p-2.5',
        xl: 'p-3',
      },
    },
    defaultVariants: {
      color: 'primary',
      size: 'md',
    },
  }
);

export const IconBadge: React.FC<IconBadgeProps> = (props) => {
  const { color, size } = props;

  const iconSize = useMemo(() => {
    switch (size) {
      case 'sm':
        return 'h-6 w-6';
      case 'lg':
        return 'h-8 w-8';
      default:
      case 'md':
        return 'h-6 w-6';
      case 'xl':
        return 'h-8 w-8';
    }
  }, [size]);

  return (
    <div className={classNames(iconBadgeVariants({ color, size }))}>
      <props.icon className={iconSize} />
    </div>
  );
};
