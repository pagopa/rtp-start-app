import { Button, Stack, Typography } from '@mui/material';
import CopyClipboard from '../CopyClipboard';
import { useDialog } from 'src/stores/dialog.store';
import { DialogType, getDialogData } from 'src/utils/dialog.utils';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from 'src/hooks/useAuth';
import { MessageStatus } from 'src/stores/message.store';

type ResultPageProps = {
  image: string;
  title: string;
  body: string;
  buttonText: string;
  deleteButtonText?: string;
  rtpCode?: string;
  type?: MessageStatus
};

export const ResultLayout = ({ image, title, body, buttonText, deleteButtonText, rtpCode, type = "default" }: ResultPageProps) => {

  const navigate = useNavigate();
  const { openDialog } = useDialog();

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
            <Typography variant="h4" component="h1" px={deleteButtonText ? 4 : 0}>
              {title}
            </Typography>

            {rtpCode && deleteButtonText &&
              <CopyClipboard textToCopy={rtpCode} />
            }

            <Typography variant="body1" component="div">
              {body}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction={{ xs: "column", sm: deleteButtonText ? "row" : "column"}} px={8} gap={2} sx={{width: "100%", height: "100%"}}>
          {
            deleteButtonText &&
            <Button
              type="button"
              variant="outlined"
              color="error"
              style={{
                height: "100%",
                minHeight: 45,
              }}
              onClick={() => openDialog(getDialogData(DialogType.DELETE, rtpCode))}
            >
              {deleteButtonText}
            </Button>
          }

          <Button
            onClick={handleClick}
            type="button"
            variant="contained"
            style={{
              height: "100%",
              minHeight: 45,
            }}
          >
            {buttonText}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
