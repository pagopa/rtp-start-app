import { useNavigate } from '@tanstack/react-router';
import { StatusUpdateType, useStatusUpdate } from 'src/api/useStatusUpdate';
import { RtpVersion } from 'src/models/RtpVersion';
import useMessageStore, { MessageStatus } from 'src/stores/message.store';

const SUCCESS_STATUS: Record<StatusUpdateType, MessageStatus> = {
  statusUpdate: 'statusUpdated',
  statusUpdateCancel: 'statusUpdateCancelled',
};

// Sends a status update and shows the success page (or the KO page on a server error)
export const useSendStatusUpdate = (type: StatusUpdateType) => {
  const navigate = useNavigate();
  const { setMessageStatus } = useMessageStore();
  const { mutate, isPending, isError } = useStatusUpdate(type);

  const send = (resourceId: string) =>
    mutate({ resourceId }, {
      onSuccess: (response) => {
        setMessageStatus(SUCCESS_STATUS[type]);
        navigate({
          to: '/ok',
          // Status update is available only for EPC 4.0
          search: { rtpId: resourceId, version: RtpVersion.V4, reason: response.data?.reason ?? undefined },
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
