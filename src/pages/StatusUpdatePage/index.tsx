import { Alert, Button, Divider, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { PageTitle } from "src/components/PageTitle";
import { FormField } from "src/components/FormField";
import { StatusUpdateParams, StatusUpdateType } from "src/api/useStatusUpdate";
import { useSendStatusUpdate } from "src/hooks/useSendStatusUpdate";
import { getValidationSchema } from "./resolver";
import { CancelRequestStep } from "./CancelRequestStep";

type StatusUpdatePageProps = {
  type: StatusUpdateType;
  defaultResourceId?: string;
};

export const StatusUpdatePage = ({ type, defaultResourceId }: StatusUpdatePageProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<StatusUpdateParams>({
    resolver: yupResolver(getValidationSchema()),
    defaultValues: { resourceId: defaultResourceId ?? "" },
  });
  const { send, isPending, isError } = useSendStatusUpdate(type);

  const onSubmit = ({ resourceId }: StatusUpdateParams) => send(resourceId);
  const isCancel = type === "statusUpdateCancel";

  const withValidResourceId = (callback: (resourceId: string) => void) =>
    handleSubmit(({ resourceId }) => callback(resourceId))();

  return (
    <Stack p={3} gap={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={2}>
        <PageTitle
          title={t(`StatusUpdatePage.${type}.title`)}
          description={t(`StatusUpdatePage.${type}.description`)}
        />
        <Button variant="outlined" onClick={() => navigate({ to: "/" })}>
          {t("StatusUpdatePage.backButton")}
        </Button>
      </Stack>
      <Stack p={3} gap={3} bgcolor="background.paper" component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="body2">
          {t("StatusUpdatePage.epcNotice")}
        </Typography>
        <FormField
          label={t("StatusUpdatePage.resourceIdLabel")}
          name="resourceId"
          control={control}
          isUppercase={false}
          autocompleteOff
        />
        {isCancel && (
          <>
            <Alert variant="outlined" severity="warning">
              {t("StatusUpdatePage.statusUpdateCancel.cancelRequiredNotice")}
            </Alert>
            <CancelRequestStep withValidResourceId={withValidResourceId} />
            <Divider />
            <Typography variant="h6">{t("StatusUpdatePage.statusUpdateCancel.stepTitle")}</Typography>
          </>
        )}
        {isError && (
          <Alert variant="outlined" severity="error">
            {t("StatusUpdatePage.error")}
          </Alert>
        )}
        <Stack direction="row" justifyContent="flex-end">
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            disabled={isPending}
            loading={isPending}
            sx={{ minHeight: "50px" }}
          >
            {t(`StatusUpdatePage.${type}.submitButton`)}
          </LoadingButton>
        </Stack>
      </Stack>
    </Stack>
  );
};
