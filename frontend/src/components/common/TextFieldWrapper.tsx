import React from 'react';
import TextField from '@mui/material/TextField';

interface TextFieldWrapperProps extends React.ComponentProps<typeof TextField> {
  label: string;
  errorMessage?: string;
  value: string | number;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: React.HTMLInputTypeAttribute;
}

const TextFieldWrapper: React.FC<TextFieldWrapperProps> = ({
  label,
  errorMessage,
  value,
  onChangeHandler,
  type,
  ...props
}) => {
  return (
    <TextField
      label={label}
      error={!!errorMessage}
      helperText={errorMessage}
      fullWidth
      value={value}
      type={type}
      onChange={onChangeHandler}
      {...props}
    />
  );
};

export default TextFieldWrapper;
