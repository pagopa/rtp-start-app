import { Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';

type FormSectionProps = {
  title: string;
  icon: ReactNode;
  children: ReactNode;
};

export const FormSection = ({ title, icon, children }: FormSectionProps) => (
  <Stack
    border={1}
    borderRadius={2}
    borderColor="#E3E7EB"
    bgcolor="background.paper"
    p={3}
    gap={3}
  >
    <Stack direction="row" gap={1} alignItems="center">
      {icon}
      <Typography variant="sidenav">{title}</Typography>
    </Stack>
    {children}
  </Stack>
);
