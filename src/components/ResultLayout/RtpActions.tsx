import { Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CancelReason } from 'generated/apiClient';
import { RtpVersion } from 'src/models/RtpVersion';
import { useDialog } from 'src/stores/dialog.store';
import { DialogType, getDialogData } from 'src/utils/dialog.utils';
import { StatusUpdateButton } from 'src/components/StatusUpdateButton';

type RtpActionsProps = {
  rtpId: string;
  version: RtpVersion;
};

const VERSION_SUFFIX: Record<RtpVersion, 'V3' | 'V4'> = {
  [RtpVersion.V3]: 'V3',
  [RtpVersion.V4]: 'V4',
};

export const RtpActions = ({ rtpId, version }: RtpActionsProps) => {
  const { t } = useTranslation();
  const { openDialog } = useDialog();
  const suffix = VERSION_SUFFIX[version];
  const variant = version === RtpVersion.V4 ? 'contained' : 'outlined';

  const openCancelDialog = (reason: CancelReason) =>
    openDialog(getDialogData(DialogType.DELETE, rtpId, reason, version));

  return (
    <Stack direction="column" gap={2}>
      <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
        <Button
          type="button"
          variant={variant}
          color="error"
          fullWidth
          style={{ minHeight: 45 }}
          onClick={() => openCancelDialog(CancelReason.MODT)}
        >
          {t(`OK.rtpParams.cancelModtButton${suffix}`)}
        </Button>
        <Button
          type="button"
          variant={variant}
          color="error"
          fullWidth
          style={{ minHeight: 45 }}
          onClick={() => openCancelDialog(CancelReason.PAID)}
        >
          {t(`OK.rtpParams.cancelPaidButton${suffix}`)}
        </Button>
      </Stack>
      {version === RtpVersion.V4 && (
        <StatusUpdateButton
          type="statusUpdate"
          rtpId={rtpId}
          label={t('OK.rtpParams.statusUpdateButtonV4')}
        />
      )}
    </Stack>
  );
};
