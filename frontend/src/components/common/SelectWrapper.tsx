import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  SelectChangeEvent,
  SelectProps,
} from '@mui/material';

interface SelectWrapperProps extends Omit<SelectProps, 'onChange' | 'value'> {
  label: string;
  options: { value: string | number; label: string }[];
  errorMessage?: string;
  value: unknown;
  helperText?: string;
  onChangeHandler: (event: SelectChangeEvent<any>) => void;
}

const SelectWrapper: React.FC<SelectWrapperProps> = ({
  label,
  options,
  errorMessage,
  value,
  helperText,
  onChangeHandler,
  ...props
}) => {
  return (
    <FormControl
      fullWidth
      error={!!errorMessage}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={onChangeHandler}
        {...props}>
        {(options ?? []).map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errorMessage || helperText}</FormHelperText>
    </FormControl>
  );
};

export default SelectWrapper;
