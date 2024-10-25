import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { useField, useFormikContext } from "formik";
import React from "react";


const DatePickerField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props.name);
  return (
    <DatePicker
      {...field}
      {...props}
      //selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
    />
  );
};