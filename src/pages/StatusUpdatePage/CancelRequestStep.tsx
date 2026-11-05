import { Alert, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { CancelReason } from "generated/apiClient";
import { useCancelRtp } from "src/api/useCancelRtp";
import { STATUS_UPDATE_VERSION } from "src/api/useStatusUpdate";

type CancelRequestStepProps = {
  // Runs the callback only when the resource id in the form is valid
  withValidResourceId: (callback: (resourceId: string) => void) => void;
};

// Optional step of the Status Update Cancel page: sends the cancellation request
// (MODT or PAID) that must exist before a Status Update Cancel can be sent
export const CancelRequestStep = ({ withValidResourceId }: CancelRequestStepProps) => {
  const { t } = useTranslation();
  const { mutate, isPending, isError, isSuccess, variables } = useCancelRtp();

  const sendCancel = (reason: CancelReason) =>
    withValidResourceId((resourceId) =>
      mutate({ rtpId: resourceId, reason, version: STATUS_UPDATE_VERSION })
    );

  return (
    <Stack gap={2}>
      <Typography variant="h6">{t("StatusUpdatePage.cancelStep.title")}</Typography>
      <Typography variant="body2">{t("StatusUpdatePage.cancelStep.description")}</Typography>
      <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
        {[CancelReason.MODT, CancelReason.PAID].map((reason) => (
          <LoadingButton
            key={reason}
            type="button"
            variant="outlined"
            color="error"
            fullWidth
            disabled={isPending}
            loading={isPending && variables?.reason === reason}
            sx={{ minHeight: "45px" }}
            onClick={() => sendCancel(reason)}
          >
            {t(`StatusUpdatePage.cancelStep.${reason === CancelReason.MODT ? "modtButton" : "paidButton"}`)}
          </LoadingButton>
        ))}
      </Stack>
      {isSuccess && (
        <Alert variant="outlined" severity="success">
          {t("StatusUpdatePage.cancelStep.success", { reason: variables?.reason })}
        </Alert>
      )}
      {isError && (
        <Alert variant="outlined" severity="error">
          {t("CancelRtp.error")}
        </Alert>
      )}
    </Stack>
  );
};
