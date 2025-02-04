import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as yup from "yup";
import { checkoutTheme } from "src/style";
import "dayjs/locale/it";
import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { FormField } from ".";
import { HTMLInputTypeAttribute } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ThemeProvider } from "@emotion/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const TestComponent = ({ type }: { type?: HTMLInputTypeAttribute }) => {
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(
      yup.object({
        testName: yup.string().required("Test error message"),
      }),
    ),
  });

  return (
    <ThemeProvider theme={checkoutTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
        <form onSubmit={handleSubmit(() => {})}>
          <FormField
            label="Test Label"
            name="testName"
            type={type}
            control={control}
          />
          <button type="submit">Submit</button>
        </form>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

describe("FormField", () => {
  it("should render a TextField for non-date types", () => {
    render(<TestComponent type="text" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "text");
  });

  it("should render a DatePicker for date type", () => {
    render(<TestComponent type="date" />);

    const input = screen.getAllByRole("button")[0];
    expect(input).toHaveAttribute("aria-label", "Choose date");
  });

  it("should display error message when there is a validation error", async () => {
    render(<TestComponent type="text" />);

    const submit = screen.getByRole("button", { name: "Submit" });

    fireEvent.submit(submit);

    const errorMessage = await screen.findAllByText("Test error message");
    expect(errorMessage).toHaveLength(1);
  });
});
