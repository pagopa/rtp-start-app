import { createFileRoute } from '@tanstack/react-router';
import { StatusUpdatePage } from 'src/pages/StatusUpdatePage';

type StatusUpdateSearch = {
  resourceId?: string;
};

export const Route = createFileRoute('/status-update/')({
  validateSearch: (search: Record<string, unknown>): StatusUpdateSearch => ({
    resourceId: typeof search.resourceId === 'string' ? search.resourceId : undefined,
  }),
  component: StatusUpdateRoute,
});

function StatusUpdateRoute() {
  const { resourceId } = Route.useSearch();
  return <StatusUpdatePage type="statusUpdate" defaultResourceId={resourceId} />;
}
