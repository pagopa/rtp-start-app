import { TextField } from '@mui/material';
import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { HTMLInputTypeAttribute } from 'react';

type FormFieldProps<T extends FieldValues> = {
  label: string;
  name: FieldPath<T>;
  type?: HTMLInputTypeAttribute;
  control: Control<T>;
  isUppercase?: boolean;
  textHelper?: string;
  autocompleteOff?: boolean
};

export const FormField = <T extends FieldValues>({
  label,
  name,
  type = 'text',
  control,
  textHelper,
  autocompleteOff = false,
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
            value={field.value ?? null}
          />
        ) : (
          <TextField
            {...field}
            label={label}
            variant="outlined"
            type={type}
            fullWidth
            error={!!error}
            helperText={error ? error?.message : textHelper}
            autoComplete={`${autocompleteOff}`}
            value={field.value ?? ''}
            onChange={(e) => field.onChange(isUppercase ? e.target.value.toUpperCase() : e.target.value)}
          />
        )
      }
    />
  );
