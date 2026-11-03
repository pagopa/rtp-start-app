import { createFileRoute } from '@tanstack/react-router';
import { isRtpVersion, RtpVersion } from 'src/models/RtpVersion';

type OKPageSearch = {
  rtpId?: string;
  version?: RtpVersion;
};

export const Route = createFileRoute('/ok')({
  validateSearch: (search: Record<string, unknown>): OKPageSearch => ({
    rtpId: typeof search.rtpId === 'string' ? search.rtpId : undefined,
    version: isRtpVersion(search.version) ? search.version : undefined,
  }),
});
