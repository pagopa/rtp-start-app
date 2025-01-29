import { Stack, Typography } from '@mui/material';

type PageTitleProps = {
  title: string;
  description?: string;
};

export const PageTitle = ({ title, description }: PageTitleProps) => (
  <Stack gap={1}>
    <Typography variant="h4" component="h1">
      {title}
    </Typography>
    {description && (
      <Typography variant="body2">
        {description}
      </Typography>
    )}
  </Stack>
);
