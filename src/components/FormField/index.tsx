import { TextField } from '@mui/material';
import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type FormFieldProps<T extends FieldValues> = {
  label: string;
  name: FieldPath<T>;
  type?: 'text' | 'number' | 'date';
  control: Control<T>;
};

export const FormField = <T extends FieldValues>({
  label,
  name,
  type = 'text',
  control,
}: FormFieldProps<T>) => (
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
