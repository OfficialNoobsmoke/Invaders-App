import React, { useEffect, useRef, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { Button, ButtonProps } from '../button/Button';
import { Scheme } from '../theme-icons/ThemeConstants';
import { ThemeIcons } from '../theme-icons/ThemeIcons';

export const ThemeConfig: React.FC<Omit<ButtonProps, 'onClick' | 'onPress' | 'icon'>> = (props) => {
  const { color = 'neutral', tooltip = 'Change theme', variant = 'icon', ...rest } = props;

  const [scheme, setScheme] = useState<Scheme>(
    (localStorage.getItem('schemePreference') as Scheme) ||
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(scheme);
    localStorage.setItem('schemePreference', scheme);
  }, [scheme]);

  const ref = useRef(null);

  return (
    <Popover triggerRef={ref}>
      <PopoverTrigger>
        <Button
          {...rest}
          ref={ref}
          color={color}
          variant={variant}
          tooltip={tooltip}
          icon={ThemeIcons.Palette}
        />
      </PopoverTrigger>
      <PopoverContent className="bg-card">
        <div className="flex flex-col">
          <div className="flex flex-col px-1 py-2">
            <span className="text-sm font-bold">Theme mode</span>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {['light', 'dark'].map((mode) => (
                <Button
                  key={mode}
                  size="sm"
                  color="neutral"
                  onClick={() => setScheme(mode as Scheme)}
                  className={scheme === mode ? 'border-primary ring-1 ring-primary' : ''}
                  variant="outline"
                >
                  {mode === 'light' ? <ThemeIcons.Light /> : <ThemeIcons.Dark />}
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};