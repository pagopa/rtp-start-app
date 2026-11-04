import { createFileRoute } from '@tanstack/react-router';
import { isRtpVersion, RtpVersion } from 'src/models/RtpVersion';
import { isOkResult, OkResult } from 'src/models/OkResult';

type OKPageSearch = {
  result?: OkResult;
  rtpId?: string;
  version?: RtpVersion;
  reason?: string;
};

export const Route = createFileRoute('/ok')({
  validateSearch: (search: Record<string, unknown>): OKPageSearch => ({
    result: isOkResult(search.result) ? search.result : undefined,
    rtpId: typeof search.rtpId === 'string' ? search.rtpId : undefined,
    version: isRtpVersion(search.version) ? search.version : undefined,
    reason: typeof search.reason === 'string' ? search.reason : undefined,
  }),
});
