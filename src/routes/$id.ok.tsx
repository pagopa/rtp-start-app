import { createFileRoute } from '@tanstack/react-router';
import { isRtpVersion, RtpVersion } from 'src/models/RtpVersion';

type ConfirmedPageSearch = {
  version?: RtpVersion;
};

export const Route = createFileRoute('/$id/ok')({
  validateSearch: (search: Record<string, unknown>): ConfirmedPageSearch => ({
    version: isRtpVersion(search.version) ? search.version : undefined,
  }),
});
