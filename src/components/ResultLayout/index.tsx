import { Button, Stack, Typography } from '@mui/material';
import { Link } from '@tanstack/react-router';

type ResultPageProps = {
  image: string;
  title: string;
  body: string;
  buttonText: string;
};

export const ResultLayout = ({ image, title, body, buttonText }: ResultPageProps) => {
  return (
    <Stack justifyContent="center" py={4}>
      <Stack alignItems="center" gap={4} maxWidth={'sm'} alignSelf="center">
        <Stack gap={4} alignItems="center">
          <img src={image} alt="result-image" />
          <Stack gap={1} alignItems="center" textAlign="center" maxWidth="448px">
            <Typography variant="h4" component="h1">
              {title}
            </Typography>
            <Typography variant="body1" component="div">
              {body}
            </Typography>
          </Stack>
        </Stack>
        <Stack pr={8} pl={8} sx={{ width: '100%', height: '100%' }}>
          <Link to="/">
            <Button
              type="button"
              variant="contained"
              style={{
                width: '100%',
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
