import { createFileRoute } from '@tanstack/react-router';
import { StatusUpdatePage } from 'src/pages/StatusUpdatePage';

export const Route = createFileRoute('/status-update/')({
  component: () => <StatusUpdatePage type="statusUpdate" />,
});
