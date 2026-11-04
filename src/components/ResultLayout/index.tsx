import { Button, Stack, Typography } from '@mui/material';
import CopyClipboard from '../CopyClipboard';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from 'src/hooks/useAuth';
import { MessageStatus } from 'src/stores/message.store';
import { ReactNode } from 'react';

type ResultPageProps = {
  image: string;
  title: string;
  body: string;
  buttonText: string;
  rtpCode?: string;
  actions?: ReactNode;
  type?: MessageStatus
};

export const ResultLayout = ({ image, title, body, buttonText, rtpCode, actions, type = "default" }: ResultPageProps) => {

  const navigate = useNavigate();

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

            {rtpCode &&
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

          {actions}
        </Stack>
      </Stack>
    </Stack>
  );
};
