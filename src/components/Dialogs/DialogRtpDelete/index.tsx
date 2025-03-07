import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";
import { useDialog } from "src/stores/dialog.store";

export type DialogRtpDeleteProps = {
    rtpId: string;
}

export default function DialogRtpDelete({rtpId}: DialogRtpDeleteProps) {

  const { closeDialog } = useDialog();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleRtpDeletion = () => {
    console.log("DELETE ", rtpId);
    closeDialog();
    navigate({to: "/ok"});
  };

  return (
    <>
      <Typography variant="body1" sx={{ mb: "32px" }}>
        <Trans i18nKey={"Dialogs.delete.description"} />
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} justifyContent={"end"} gap={2}>
        <Button
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

        <Button
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
        </Button>
      </Stack>
    </>
  );
}