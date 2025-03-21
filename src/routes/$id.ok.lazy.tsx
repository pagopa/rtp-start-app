import { createLazyFileRoute } from '@tanstack/react-router'
import ConfirmedPage from 'src/pages/ConfimedPage';

export const Route = createLazyFileRoute('/$id/ok')({
  component: ConfirmedPage,
});
