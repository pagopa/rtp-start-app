import { Button } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { StatusUpdateType } from 'src/api/useStatusUpdate';

type StatusUpdateButtonProps = {
  type: StatusUpdateType;
  rtpId: string;
  label: string;
};

const ROUTES = {
  statusUpdate: '/status-update',
  statusUpdateCancel: '/status-update/cancel',
} as const;

// Opens the status update form with the RTP id prefilled
export const StatusUpdateButton = ({ type, rtpId, label }: StatusUpdateButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      type="button"
      variant="outlined"
      fullWidth
      style={{ minHeight: 45 }}
      onClick={() => navigate({ to: ROUTES[type], search: { resourceId: rtpId } })}
    >
      {label}
    </Button>
  );
};
