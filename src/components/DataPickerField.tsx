import { DatePicker, DatePickerProps, PickerValidDate } from "@mui/x-date-pickers";
import { useField, useFormikContext } from "formik";

type Props<TInputDate extends PickerValidDate> = {
  name: string;
} & Omit<DatePickerProps<TInputDate, boolean>, "onChange" | "value">;

export const FormikDatePicker = <TInputDate extends PickerValidDate>(
  props: Props<TInputDate>
) => {
  const { name, ...restProps } = props;
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();
  return (
    <DatePicker
      {...restProps}
      value={field.value ?? null}
      onChange={(val) => setFieldValue(name, val)}
    />
  );
};
