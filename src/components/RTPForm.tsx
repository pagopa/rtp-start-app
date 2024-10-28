/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable functional/immutable-data */
/* eslint-disable @typescript-eslint/no-empty-function */

import { Box, InputAdornment } from "@mui/material";
import { Formik, FormikProps } from "formik";
import React from "react";
import { FormButtons } from "../components/FormButtons/FormButton";
import TextFormField from "../components/TextFormField";
import { cleanSpaces } from "../utils/form/formatters";
import { getFormValidationIcon } from "../utils/form/validators";
import { useTranslation } from "react-i18next";

import {
  RTPFormErrors,
  RTPFormFields,
} from "../components/rtpModel";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FormikDatePicker } from "./DataPickerField";

export function RTPForm(props: {
  defaultValues?: RTPFormFields;
  onSubmit: (notice: RTPFormFields) => void;
}) {
  const formRef = React.useRef<FormikProps<RTPFormFields>>(null);
  const [disabled, setDisabled] = React.useState(!props.defaultValues?.payee);
  const { t } = useTranslation();

  const validate = (values: RTPFormFields) => {
    const errors: RTPFormErrors = {
      ...(values.noticeNumber
        ? {
          ...(/\b^\d{18}$\b/.test(values.noticeNumber)
            ? {}
            : { noticeNumber: "paymentNoticePage.formErrors.minCode" }),
        }
        : { noticeNumber: "paymentNoticePage.formErrors.required" }),
      ...(values.description
        ? {}
        : { description: "paymentNoticePage.formErrors.required" }),
      ...(values.payeeCompanyName
        ? {}
        : { payeeCompanyName: "paymentNoticePage.formErrors.required" }),
      ...(values.payee
        ? {
          ...(/\b^\d{11}$\b/.test(values.payee)
            ? {}
            : { payee: "paymentNoticePage.formErrors.minCf" }),
        }
        : { payee: "paymentNoticePage.formErrors.required" }),
      ...(values.payerId
        ? {}
        : { payerId: "paymentNoticePage.formErrors.required" }),
    };

    setDisabled(!!(errors.noticeNumber || errors.payee));
    return errors;
  };

  return (
    <>
      <Formik
        innerRef={formRef}
        initialValues={
          props.defaultValues || {
            noticeNumber: "",
            amount: 0,
            description: "",
            expiryDate: undefined,
            payeeCompanyName: "",
            payee: "",
            payerId: "",
          }
        }
        validate={validate}
        onSubmit={props.onSubmit}
      >
        {({
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box>
              <TextFormField
                fullWidth
                variant="outlined"
                errorText={errors.noticeNumber}
                error={!!(errors.noticeNumber && touched.noticeNumber)}
                label="rtp.noticeNumber"
                id="noticeNumber"
                type="text"
                inputMode="numeric"
                value={values.noticeNumber}
                handleChange={(e) => {
                  e.currentTarget.value = cleanSpaces(e.currentTarget.value);
                  handleChange(e);
                }}
                handleBlur={handleBlur}
                sx={{ mb: 4 }}
                endAdornment={
                  <InputAdornment position="end">
                    {getFormValidationIcon(
                      !!values.noticeNumber,
                      !!errors.noticeNumber
                    )}
                  </InputAdornment>
                }
              />
              <TextFormField
                fullWidth
                variant="outlined"
                errorText={errors.amount}
                error={Boolean(errors.amount && touched.amount)}
                label="rtp.amount"
                id="amount"
                type="numeric"
                inputMode="numeric"
                sx={{ mb: 4 }}
                value={values.amount}
                handleChange={(e) => {
                  e.currentTarget.value = cleanSpaces(e.currentTarget.value);
                  handleChange(e);
                }}
                handleBlur={handleBlur}
                endAdornment={
                  <InputAdornment position="end">
                    {getFormValidationIcon(!!values.amount, !!errors.amount)}
                  </InputAdornment>
                }
              />
              <TextFormField
                fullWidth
                variant="outlined"
                errorText={errors.description}
                error={Boolean(errors.description && touched.description)}
                label="rtp.description"
                id="description"
                type="text"
                inputMode="numeric"
                sx={{ mb: 4 }}
                value={values.description}
                handleChange={(e) => {
                  e.currentTarget.value = cleanSpaces(e.currentTarget.value);
                  handleChange(e);
                }}
                handleBlur={handleBlur}
                endAdornment={
                  <InputAdornment position="end">
                    {getFormValidationIcon(!!values.description, !!errors.description)}
                  </InputAdornment>
                }
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormikDatePicker 
                  slotProps={{ textField: { fullWidth: true } }}
                  format="DD/MM/YYYY"
                  name="expiryDate"
                  label={t("rtp.expiryDate")}
                  sx={{ mb: 4 }}
                />
              </LocalizationProvider>
              <TextFormField
                fullWidth
                variant="outlined"
                errorText={errors.payeeCompanyName}
                error={Boolean(errors.payeeCompanyName && touched.payeeCompanyName)}
                label="rtp.payeeCompanyName"
                id="payeeCompanyName"
                type="text"
                inputMode="numeric"
                sx={{ mb: 4 }}
                value={values.payeeCompanyName}
                handleChange={(e) => {
                  e.currentTarget.value = cleanSpaces(e.currentTarget.value);
                  handleChange(e);
                }}
                handleBlur={handleBlur}
                endAdornment={
                  <InputAdornment position="end">
                    {getFormValidationIcon(!!values.payeeCompanyName, !!errors.payeeCompanyName)}
                  </InputAdornment>
                }
              />
              <TextFormField
                fullWidth
                variant="outlined"
                errorText={errors.payee}
                error={Boolean(errors.payee && touched.payee)}
                label="rtp.payee"
                id="payee"
                type="text"
                inputMode="numeric"
                sx={{ mb: 4 }}
                value={values.payee}
                handleChange={(e) => {
                  e.currentTarget.value = cleanSpaces(e.currentTarget.value);
                  handleChange(e);
                }}
                handleBlur={handleBlur}
                endAdornment={
                  <InputAdornment position="end">
                    {getFormValidationIcon(!!values.payee, !!errors.payee)}
                  </InputAdornment>
                }
              />
              <TextFormField
                fullWidth
                variant="outlined"
                errorText={errors.payerId}
                error={Boolean(errors.payerId && touched.payerId)}
                label="rtp.payerId"
                id="payerId"
                type="text"
                inputMode="numeric"
                sx={{ mb: 4 }}
                value={values.payerId}
                handleChange={(e) => {
                  e.currentTarget.value = cleanSpaces(e.currentTarget.value);
                  handleChange(e);
                }}
                handleBlur={handleBlur}
                endAdornment={
                  <InputAdornment position="end">
                    {getFormValidationIcon(!!values.payerId, !!errors.payerId)}
                  </InputAdornment>
                }
              />
            </Box>
            <FormButtons
              type="submit"
              submitTitle="paymentNoticePage.formButtons.submit"
              cancelTitle="paymentNoticePage.formButtons.cancel"
              idCancel="paymentNoticeButtonCancel"
              idSubmit="paymentNoticeButtonContinue"
              disabledSubmit={disabled}
              handleSubmit={() => handleSubmit()}
            />
          </form>
        )}
      </Formik>
    </>
  );
}
