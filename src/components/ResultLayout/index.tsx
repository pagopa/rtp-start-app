import { Button, Stack, Typography } from '@mui/material';
import { Link } from '@tanstack/react-router';
import CopyClipboard from '../CopyClipboard';

type ResultPageProps = {
  image: string;
  title: string;
  body: string;
  buttonText: string;
  deleteButtonText?: string;
  rtpCode?: string;
};

export const ResultLayout = ({ image, title, body, buttonText, deleteButtonText, rtpCode }: ResultPageProps) => {
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
        <Stack px={8} gap={2} direction="row" sx={{width: '100%', height: '100%'}}>
          {
            deleteButtonText &&
            <Button
              type="button"
              variant="outlined"
              color="error"
              style={{
                height: '100%',
                minHeight: 45,
              }}
            >
              {deleteButtonText}
            </Button>
          }

          <Link to="/">
            <Button
              type="button"
              variant="contained"
              style={{
                height: '100%',
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
