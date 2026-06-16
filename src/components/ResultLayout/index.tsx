import { Button, Stack, Typography } from '@mui/material';
import CopyClipboard from '../CopyClipboard';
import { useDialog } from 'src/stores/dialog.store';
import { DialogType, getDialogData } from 'src/utils/dialog.utils';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from 'src/hooks/useAuth';
import { MessageStatus } from 'src/stores/message.store';
import { CancelReason } from 'generated/apiClient';

type ResultPageProps = {
  image: string;
  title: string;
  body: string;
  buttonText: string;
  cancelModtButtonTextV3?: string;
  cancelModtButtonTextV4?: string;
  cancelPaidButtonTextV3?: string;
  cancelPaidButtonTextV4?: string;
  rtpCode?: string;
  type?: MessageStatus
};

export const ResultLayout = ({ image, title, body, buttonText, cancelModtButtonTextV3, cancelModtButtonTextV4, cancelPaidButtonTextV3, cancelPaidButtonTextV4, rtpCode, type = "default" }: ResultPageProps) => {

  const navigate = useNavigate();
  const { openDialog } = useDialog();

  const hasCancelButtons = (cancelModtButtonTextV3 || cancelModtButtonTextV4 || cancelPaidButtonTextV3 || cancelPaidButtonTextV4) && rtpCode;

  const handleClick = () => {
    if(type === 'unauthorized') {
      useAuth.getState().logout();
      navigate({to: '/login'});
    } else {
      navigate({to: '/'});
    }
  };

  return (
    <Stack justifyContent="center" py={4}>
      <Stack alignItems="center" direction={"column"} gap={"30px"} maxWidth={'sm'} alignSelf="center">
        <Stack gap={"30px"} alignItems="center">
          <img src={image} alt="result-image" />
          <Stack gap={"30px"} alignItems="center" textAlign="center" maxWidth="448px">
            <Typography variant="h4" component="h1">
              {title}
            </Typography>

            {rtpCode && hasCancelButtons &&
              <CopyClipboard textToCopy={rtpCode} />
            }

            <Typography variant="body1" component="div">
              {body}
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="column" px={8} gap={2} sx={{width: "100%"}}>
          <Button
            onClick={handleClick}
            type="button"
            variant="contained"
            style={{ minHeight: 45 }}
          >
            {buttonText}
          </Button>

          {hasCancelButtons && (
            <Stack direction="column" gap={2}>
              <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
                {cancelModtButtonTextV3 && (
                  <Button
                    type="button"
                    variant="outlined"
                    color="error"
                    fullWidth
                    style={{ minHeight: 45 }}
                    onClick={() => openDialog(getDialogData(DialogType.DELETE, rtpCode, CancelReason.MODT, "v1"))}
                  >
                    {cancelModtButtonTextV3}
                  </Button>
                )}
                {cancelModtButtonTextV4 && (
                  <Button
                    type="button"
                    variant="contained"
                    color="error"
                    fullWidth
                    style={{ minHeight: 45 }}
                    onClick={() => openDialog(getDialogData(DialogType.DELETE, rtpCode, CancelReason.MODT, "v2"))}
                  >
                    {cancelModtButtonTextV4}
                  </Button>
                )}
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
                {cancelPaidButtonTextV3 && (
                  <Button
                    type="button"
                    variant="outlined"
                    color="error"
                    fullWidth
                    style={{ minHeight: 45 }}
                    onClick={() => openDialog(getDialogData(DialogType.DELETE, rtpCode, CancelReason.PAID, "v1"))}
                  >
                    {cancelPaidButtonTextV3}
                  </Button>
                )}
                {cancelPaidButtonTextV4 && (
                  <Button
                    type="button"
                    variant="contained"
                    color="error"
                    fullWidth
                    style={{ minHeight: 45 }}
                    onClick={() => openDialog(getDialogData(DialogType.DELETE, rtpCode, CancelReason.PAID, "v2"))}
                  >
                    {cancelPaidButtonTextV4}
                  </Button>
                )}
              </Stack>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};
