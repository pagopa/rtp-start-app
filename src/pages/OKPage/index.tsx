import { useTranslation } from 'react-i18next';
import { useSearch } from '@tanstack/react-router';
import ok from '../../assets/images/ok.svg';
import { ResultLayout } from 'src/components/ResultLayout';
import { StatusUpdateButton } from 'src/components/StatusUpdateButton';
import { RtpVersion } from 'src/models/RtpVersion';
import useMessageStore from 'src/stores/message.store';

export default function OKPage() {
  const { t } = useTranslation();
  const { messageStatus } = useMessageStore();
  const { rtpId, version, reason } = useSearch({ from: '/ok' });

  // Status update on a cancellation is available only for EPC 4.0
  const showStatusUpdateCancel = messageStatus === 'deleted' && version === RtpVersion.V4 && rtpId;

  const isStatusUpdate = messageStatus === 'statusUpdated' || messageStatus === 'statusUpdateCancelled';

  const body = isStatusUpdate
    ? reason
      ? t(`OK.${messageStatus}.reason`, { reason })
      : t(`OK.${messageStatus}.noReason`)
    : t(`OK.${messageStatus}.body`);

  return (
    <ResultLayout
      image={ok}
      title={t(`OK.${messageStatus}.title`) || ''}
      body={body}
      buttonText={t(`OK.${messageStatus}.button`)}
      rtpCode={isStatusUpdate ? rtpId : undefined}
      type={messageStatus}
      actions={showStatusUpdateCancel && (
        <StatusUpdateButton
          type="statusUpdateCancel"
          rtpId={rtpId}
          label={t('OK.deleted.statusUpdateCancelButtonV4')}
        />
      )}
    />
  );
}
