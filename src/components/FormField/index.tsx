import { TextField } from '@mui/material';
import { Controller, Control, FieldPath } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CreateRtp } from 'generated/apiClient';

type FormFieldProps = {
  label: string;
  name: FieldPath<CreateRtp>;
  type?: 'text' | 'number' | 'date';
  control: Control<CreateRtp>;
};

export const FormField = ({ label, name, type = 'text', control }: FormFieldProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { error } }) =>
      type === 'date' ? (
        <DatePicker
          {...field}
          label={label}
          sx={{ width: '100%' }}
          slotProps={{
            textField: { error: !!error, helperText: error?.message },
          }}
        />
      ) : (
        <TextField
          {...field}
          label={label}
          variant="outlined"
          type={type}
          fullWidth
          error={!!error}
          helperText={error?.message}
        />
      )
    }
  />
);
