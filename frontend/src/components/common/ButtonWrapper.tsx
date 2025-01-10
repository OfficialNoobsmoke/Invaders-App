import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface ButtonWrapperProps extends ButtonProps {
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  startIcon?: React.ReactNode;
}

export default function ButtonWrapper({ variant = 'contained', color = 'primary', ...props }: ButtonWrapperProps) {
  return (
    <Button
      variant={variant}
      startIcon={props.startIcon}
      color={color}
      {...props}>
      {props.children}
    </Button>
  );
}
