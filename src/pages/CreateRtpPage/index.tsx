import { Stack, Box, Typography, Button, Alert, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRtps } from "src/api/useRtps";
import { CreateRtp } from "generated/apiClient";
import { LoadingButton } from "@mui/lab";
import { PageTitle } from "src/components/PageTitle";
import { PayeeSection } from "./components/PayeeSection";
import { PayerSection } from "./components/PayerSection";
import { PaymentNoticeSection } from "./components/PaymentNoticeSection";
import { getValidationSchema } from "./resolver";
import { useNavigate } from "@tanstack/react-router";
import { getRtpIdFromLocationHeader } from "src/utils/headerRtpId.utils";
import { AxiosResponse } from "axios";

export const CreateRtpPage = () => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<CreateRtp>({
    resolver: yupResolver(getValidationSchema()),
  });
  const { mutate, isPending, isError } = useRtps();
  const navigate = useNavigate();

  const onSubmit = (data: CreateRtp) => {
    const formattedData: CreateRtp = {
      ...data,
      paymentNotice: {
        ...data.paymentNotice,
        amount: Math.round(data.paymentNotice.amount * 100),
      },
    };

    mutate(formattedData, {
      onSuccess: (response: AxiosResponse) => {
        const location = response.headers['location'];
        const rtpId = getRtpIdFromLocationHeader(location);
        if(rtpId) {
          navigate({ to: `/${rtpId}/ok` });
        } else {
          navigate({ to: "/ok" });
        }
      },
      onError: (error) => {
        if (error?.response?.status && (error?.response?.status>= 500)) {
          navigate({ to: "/ko" });
        }
      },
    });
  };

  return (
    <Stack p={3} gap={3} component="form">
      <PageTitle
        title={t("CreateRtpPage.title")}
        description={t("CreateRtpPage.description")}
      />
      <Stack p={3} gap={3} bgcolor="background.paper">
        <Stack justifyContent="flex-start" gap={1}>
          <Typography variant="h6" component="h2">
            {t("CreateRtpPage.formTitle")}
          </Typography>
          <Typography variant="body2">
            {t("CreateRtpPage.formDescription")}
          </Typography>
          <Box>
            <Button variant="naked">
              {t("CreateRtpPage.documentationButton")}
            </Button>
          </Box>
        </Stack>
        <PayeeSection control={control} />
        <PayerSection control={control} />
        <PaymentNoticeSection control={control} />
      </Stack>
      <Stack
        gap={2}
        direction={md ? "column" : "row"}
        justifyContent={isError ? "space-between" : "flex-end"}
        alignItems={md ? "stretch" : "center"}
      >
        {isError && (
          <Alert
            variant="outlined"
            severity="error"
            sx={{ flexGrow: 1, height: "100%" }}
          >
            {t("CreateRtpPage.error")}
          </Alert>
        )}
        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          disabled={isPending}
          loading={isPending}
          sx={{
            alignSelf: md ? "flex-end" : "center",
            height: "100%",
            display: "inline-block",
            width: md ? "auto" : "fit-content",
            minHeight: "50px"
          }}
          onClick={handleSubmit(onSubmit)}
        >
          {t("CreateRtpPage.submitButton")}
        </LoadingButton>
      </Stack>
    </Stack>
  );
};
