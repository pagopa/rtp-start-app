import { createFileRoute } from '@tanstack/react-router';
import { StatusUpdatePage } from 'src/pages/StatusUpdatePage';

type StatusUpdateCancelSearch = {
  resourceId?: string;
};

export const Route = createFileRoute('/status-update/cancel')({
  validateSearch: (search: Record<string, unknown>): StatusUpdateCancelSearch => ({
    resourceId: typeof search.resourceId === 'string' ? search.resourceId : undefined,
  }),
  component: StatusUpdateCancelRoute,
});

function StatusUpdateCancelRoute() {
  const { resourceId } = Route.useSearch();
  return <StatusUpdatePage type="statusUpdateCancel" defaultResourceId={resourceId} />;
}
