import { createFileRoute } from '@tanstack/react-router';
import { CreateRtpPage } from 'src/pages/CreateRtpPage';

export const Route = createFileRoute('/')({
  component: CreateRtpPage,
});
