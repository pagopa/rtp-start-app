import { TextField } from '@mui/material';
import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { HTMLInputTypeAttribute } from 'react';

type FormFieldProps<T extends FieldValues> = {
  label: string;
  name: FieldPath<T>;
  type?: HTMLInputTypeAttribute;
  control: Control<T>;
  isUppercase?: boolean
};

export const FormField = <T extends FieldValues>({
  label,
  name,
  type = 'text',
  control,
  isUppercase = true, 
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
            onChange={(e) => field.onChange(isUppercase ? e.target.value.toUpperCase() : e.target.value)}
          />
        )
      }
    />
  );
