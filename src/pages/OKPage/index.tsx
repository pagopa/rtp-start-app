import { useTranslation } from 'react-i18next';
import { useSearch } from '@tanstack/react-router';
import ok from '../../assets/images/ok.svg';
import { ResultLayout } from 'src/components/ResultLayout';
import { StatusUpdateButton } from 'src/components/StatusUpdateButton';
import { RtpVersion } from 'src/models/RtpVersion';

export default function OKPage() {
  const { t } = useTranslation();
  // The result comes from the URL, so a failed request on this page (e.g. a 404 on
  // Status Update Cancel) can't turn it into a generic success page
  const { result = 'default', rtpId, version, reason } = useSearch({ from: '/ok' });

  // Status update on a cancellation is available only for EPC 4.0
  const showStatusUpdateCancel = result === 'deleted' && version === RtpVersion.V4 && rtpId;

  const isStatusUpdate = result === 'statusUpdated' || result === 'statusUpdateCancelled';

  const body = isStatusUpdate
    ? reason
      ? t(`OK.${result}.reason`, { reason })
      : t(`OK.${result}.noReason`)
    : t(`OK.${result}.body`);

  return (
    <ResultLayout
      image={ok}
      title={t(`OK.${result}.title`) || ''}
      body={body}
      buttonText={t(`OK.${result}.button`)}
      rtpCode={isStatusUpdate ? rtpId : undefined}
      type={result}
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
