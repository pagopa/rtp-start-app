import { Button, Stack, Typography } from '@mui/material';
import { Link } from '@tanstack/react-router';
import CopyClipboard from '../CopyClipboard';
import { useDialog } from 'src/stores/dialog.store';
import { DialogType, getDialogData } from 'src/utils/dialog.utils';

type ResultPageProps = {
  image: string;
  title: string;
  body: string;
  buttonText: string;
  deleteButtonText?: string;
  rtpCode?: string;
};

export const ResultLayout = ({ image, title, body, buttonText, deleteButtonText, rtpCode }: ResultPageProps) => {
  
  const { openDialog } = useDialog(); 
  
  return (
    <Stack justifyContent="center" py={4}>
      <Stack alignItems="center" direction={"column"} gap={"30px"} maxWidth={'sm'} alignSelf="center">
        <Stack gap={"30px"} alignItems="center">
          <img src={image} alt="result-image" />
          <Stack gap={"30px"} alignItems="center" textAlign="center" maxWidth="448px">
            <Typography variant="h4" component="h1">
              {title}
            </Typography>

            {rtpCode &&
              <CopyClipboard textToCopy={rtpCode} />
            }

            <Typography variant="body1" component="div">
              {body}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} px={8} gap={2} sx={{width: "100%", height: "100%"}}>
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

          <Link to="/">
            <Button
              type="button"
              variant="contained"
              style={{
                width: "100%",
                height: "100%",
                minHeight: 45,
              }}
            >
              {buttonText}
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
};
