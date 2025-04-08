import LoadingButton from "@mui/lab/LoadingButton";
import { Alert, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";
import { useCancelRtp } from "src/api/useCancelRtp";
import { useDialog } from "src/stores/dialog.store";
import useMessageStore from "src/stores/message.store";

export type DialogRtpDeleteProps = {
    rtpId: string;
}

export default function DialogRtpDelete({rtpId}: DialogRtpDeleteProps) {

  const { closeDialog } = useDialog();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setMessageStatus } = useMessageStore();
  const { mutate, isPending, isError } = useCancelRtp();

  const handleRtpDeletion = () => {
    mutate(rtpId, {
      onSuccess: () => {
        setMessageStatus("deleted");
        closeDialog();
        navigate({to: "/ok"});
      },
    });
  };

  return (
    <>
      <Typography variant="body1" sx={{ mb: "32px" }}>
        <Trans i18nKey={"Dialogs.delete.description"} />
      </Typography>

      {isError &&
        <Alert
          variant="outlined"
          severity="error"
          sx={{ flexGrow: 1, height: "100%", mb: "32px" }}
        >
          {t("CancelRtp.error")}
        </Alert>
      }

      <Stack direction={{ xs: "column", sm: "row" }} justifyContent={"end"} gap={2}>
        <Button
          disabled={isPending}
          type="button"
          variant="outlined"
          color="primary"
          style={{
            minHeight: 45,
            textTransform: "none",
            fontSize: "16px",
            fontWeight: 600,
          }}
          onClick={closeDialog}
          aria-label={t("Dialogs.delete.declineAction")}
        >
          <Trans i18nKey={"Dialogs.delete.declineAction"} />
        </Button>

        <LoadingButton
          loading={isPending}
          type="button"
          variant="contained"
          color="primary"
          style={{
            minHeight: 45,
            textTransform: "none",
            fontSize: "16px",
            fontWeight: 600,
          }}
          onClick={handleRtpDeletion}
          aria-label={t("Dialogs.delete.confirmAction")}
        >
          <Trans i18nKey={"Dialogs.delete.confirmAction"} />
        </LoadingButton>
      </Stack>
    </>
  );
}