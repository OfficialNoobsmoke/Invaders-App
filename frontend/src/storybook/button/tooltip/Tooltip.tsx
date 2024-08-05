import React from 'react';
import { Tooltip as NextTooltip, TooltipProps as NextTooltipProps } from '@nextui-org/react';

export interface TooltipProps extends NextTooltipProps {}

export const Tooltip: React.FC<TooltipProps> = (props) => {
  const {
    children,
    isDisabled,
    delay = 300,
    radius = 'sm',
    showArrow = true,
    color = 'foreground',
    content,
    ...rest
  } = props;

  return (
    <NextTooltip
      radius={radius}
      showArrow={showArrow}
      isDisabled={isDisabled || !content}
      content={content}
      color={color}
      delay={delay}
      closeDelay={0}
      classNames={{
        content: ['max-w-[350px] px-4 py-2 text-xs'],
      }}
      {...rest}>
      {children}
    </NextTooltip>
  );
};
