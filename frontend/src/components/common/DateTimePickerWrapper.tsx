import React from 'react';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

interface DateTimePickerWrapperProps {
  label?: string;
  value: Dayjs | null; // Dayjs object for date-time value
  onChange: (value: Dayjs | null) => void; // Callback to handle value changes
  minDateTime?: Dayjs; // Optional minimum date-time
  maxDateTime?: Dayjs; // Optional maximum date-time
  error?: boolean; // Error state
  helperText?: string; // Helper text for error messages
  disabled?: boolean; // Disable the picker
  fullWidth?: boolean; // Make the input full width
}

const DateTimePickerWrapper: React.FC<DateTimePickerWrapperProps> = ({
  label,
  value,
  onChange,
  minDateTime,
  maxDateTime,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label={label}
        value={value}
        onChange={onChange}
        minDateTime={minDateTime}
        maxDateTime={maxDateTime}
      />
    </LocalizationProvider>
  );
};

export default DateTimePickerWrapper;
