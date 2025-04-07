import { ChangeEvent } from "react";

export const formatAmountOnBlur = (value: string) => {
  const numericValue = parseFloat(value.replace(",", "."));
  if (isNaN(numericValue)) return "";
  return numericValue.toFixed(2).replace(".", ",");
};


export const formatAmountOnChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  let value = event.target.value;
  value = value.replace(/[^0-9,.]/g, "");
  const parts = value.split(",");
  if (parts.length > 2) {
    value = parts[0] + "," + parts.slice(1).join("");
  }
  // Block entry of more than two decimal places
  if (parts.length === 2 && parts[1].length > 2) {
    value = parts[0] + "," + parts[1].slice(0, 2);
  }

  return value;
};