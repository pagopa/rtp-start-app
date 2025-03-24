import { TextField } from '@mui/material';
import { Controller, Control, FieldPath, FieldValues, ControllerRenderProps, Path } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import { formatAmountOnBlur, formatAmountOnChange } from 'src/utils/formatAmount.utils';

type FormFieldProps<T extends FieldValues> = {
  label: string;
  name: FieldPath<T>;
  type?: HTMLInputTypeAttribute;
  control: Control<T>;
  isUppercase?: boolean;
  textHelper?: string;
  autocompleteOff?: boolean,
  isAmount?: boolean
};

export const FormField = <T extends FieldValues>({
  label,
  name,
  type = 'text',
  control,
  textHelper,
  autocompleteOff = false,
  isUppercase = true,
  isAmount = false
}: FormFieldProps<T>) => {

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: ControllerRenderProps<T, Path<T>>) => {
    if(isAmount) {
      const value = formatAmountOnChange(event);
      field.onChange(value);
    } else {
      field.onChange(isUppercase ? event.target.value.toUpperCase() : event.target.value);
    }
  };
    
  return <Controller
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
          onChange={(e) => handleChange(e, field)}
          onBlur={() => isAmount && field.onChange(formatAmountOnBlur(field.value))}
        />
      )
    }
  />;
};
