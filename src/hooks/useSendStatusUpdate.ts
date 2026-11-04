import { useNavigate } from '@tanstack/react-router';
import { StatusUpdateType, useStatusUpdate } from 'src/api/useStatusUpdate';
import { RtpVersion } from 'src/models/RtpVersion';
import { OkResult } from 'src/models/OkResult';

const SUCCESS_RESULT: Record<StatusUpdateType, OkResult> = {
  statusUpdate: 'statusUpdated',
  statusUpdateCancel: 'statusUpdateCancelled',
};

// Sends a status update and shows the success page (or the KO page on a server error)
export const useSendStatusUpdate = (type: StatusUpdateType) => {
  const navigate = useNavigate();
  const { mutate, isPending, isError } = useStatusUpdate(type);

  const send = (resourceId: string) =>
    mutate({ resourceId }, {
      onSuccess: (response) => {
        navigate({
          to: '/ok',
          search: {
            result: SUCCESS_RESULT[type],
            rtpId: resourceId,
            // Status update is available only for EPC 4.0
            version: RtpVersion.V4,
            reason: response.data?.reason ?? undefined,
          },
        });
      },
      onError: (error) => {
        if (error?.response?.status && error.response.status >= 500) {
          navigate({ to: '/ko' });
        }
      },
    });

  return { send, isPending, isError };
};
