import React, { useMemo } from 'react';
import {
  ButtonProps as NextButtonProps,
  Ripple,
  Spinner,
  TooltipProps,
  useButton,
  forwardRef,
  InternalForwardRefRenderFunction,
} from '@nextui-org/react';
import { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';
import { Color } from '../theme-icons/ThemeConstants';
import { Tooltip } from './tooltip/Tooltip';

export type ButtonVariants = ('filled' | 'outline' | 'icon') | NextButtonProps['variant'];

export type ButtonProps = Omit<NextButtonProps, 'variant' | 'color'> & {
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  color?: Color;
  loading?: boolean;
  disabled?: boolean;
  iconPosition?: 'left' | 'right';
  variant?: ButtonVariants;

  icon?: IconType;

  tooltip?: string;
  tooltipPosition?: TooltipProps['placement'];

  delay?: number;
};

export const Button: InternalForwardRefRenderFunction<'button', ButtonProps> = forwardRef<'button', ButtonProps>(
  (props, ref) => {
    const {
      type = 'button',
      className,
      color = 'primary',
      variant = 'filled',
      size = 'md',
      radius = 'sm',
      loading = false,
      icon,
      iconPosition = 'left',
      tooltip,
      tooltipPosition = 'top',
      isIconOnly,
      disabled,

      delay,

      ...rest
    } = props;

    const iconSizes = useMemo(() => {
      switch (size) {
        case 'sm':
        default:
        case 'md':
          return 'w-5 h-5';
        case 'lg':
          return 'h-8 w-8';
      }
    }, [size]);

    const _variant: NextButtonProps['variant'] = useMemo(() => {
      switch (variant) {
        case 'outline':
          return 'ghost';
        case 'icon':
          return 'light';
        case 'filled':
          return 'solid';
        default:
          return variant;
      }
    }, [variant]);

    const _color: any = useMemo(() => {
      switch (color) {
        case 'danger':
          return 'danger';
        case 'neutral':
          return 'default';
        default:
          return color;
      }
    }, [color]);

    const {
      Component,
      children,
      domRef,
      styles,
      spinnerSize,
      spinner = (
        <Spinner
          color="current"
          size={spinnerSize}
        />
      ),
      startContent,
      endContent,
      isLoading,
      disableRipple,
      getButtonProps,
      getRippleProps,
    } = useButton({
      ...rest,
      color: _color,
      variant: _variant,
      isLoading: loading,
      isDisabled: disabled,
      isIconOnly: isIconOnly === true || variant === 'icon',
      size,
      type,
      radius,
      className: twMerge(
        color === 'neutral' && !['filled', 'solid', 'shadow'].includes(variant) ? 'text-neutral-500' : '',
        'data-[focus-visible=true]:outline-primary',
        className
      ),
      ref,
    });

    const component = (
      <Component
        ref={domRef}
        className={styles}
        {...getButtonProps()}>
        {startContent}
        {iconPosition === 'left' && (
          <IconContent
            spinner={spinner}
            iconSizes={iconSizes}
            isLoading={isLoading}
            icon={icon}
          />
        )}
        {variant !== 'icon' && children}
        {iconPosition === 'right' && (
          <IconContent
            spinner={spinner}
            iconSizes={iconSizes}
            isLoading={isLoading}
            icon={icon}
          />
        )}
        {endContent}
        {!disableRipple && <Ripple {...getRippleProps()} />}
      </Component>
    );

    if (tooltip) {
      return (
        <Tooltip
          content={tooltip}
          placement={tooltipPosition}
          isDisabled={disabled}>
          {component}
        </Tooltip>
      );
    }
    return component;
  }
);

Button.displayName = 'NewButton';

type IconContentProps = {
  isLoading: boolean;
  icon?: IconType;
  iconSizes: string;
  spinner?: React.ReactNode;
};

const IconContent: React.FC<IconContentProps> = (props) => {
  const { isLoading, icon, iconSizes, spinner } = props;

  if (isLoading) {
    return <>{spinner}</>;
  }
  if (!icon) {
    return <></>;
  }
  return <>{React.createElement(icon, { className: iconSizes })}</>;
};
