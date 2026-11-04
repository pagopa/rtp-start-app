import { Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTranslation } from 'react-i18next';
import { StatusUpdateType } from 'src/api/useStatusUpdate';
import { useSendStatusUpdate } from 'src/hooks/useSendStatusUpdate';

type StatusUpdateButtonProps = {
  type: StatusUpdateType;
  rtpId: string;
  label: string;
};

// Sends the status update right away and shows the success page, like the cancellation flow
export const StatusUpdateButton = ({ type, rtpId, label }: StatusUpdateButtonProps) => {
  const { t } = useTranslation();
  const { send, isPending, isError } = useSendStatusUpdate(type);

  return (
    <>
      <LoadingButton
        type="button"
        variant="outlined"
        fullWidth
        style={{ minHeight: 45 }}
        loading={isPending}
        onClick={() => send(rtpId)}
      >
        {label}
      </LoadingButton>
      {isError && (
        <Alert variant="outlined" severity="error">
          {t('StatusUpdatePage.error')}
        </Alert>
      )}
    </>
  );
};
