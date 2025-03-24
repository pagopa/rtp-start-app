import { Stack } from '@mui/material';
import BadgeIcon from '@mui/icons-material/Badge';
import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { CreateRtp } from 'generated/apiClient';
import { FormSection } from 'src/components/FormSection';
import { FormField } from 'src/components/FormField';

type PayeeSectionProps = {
  control: Control<CreateRtp>;
};

export const PayeeSection = ({ control }: PayeeSectionProps) => {
  const { t } = useTranslation();

  return (
    <FormSection
      title={t('CreateRtpPage.payeeSectionTitle')}
      icon={<BadgeIcon />}
    >
      <FormField
        label={t('CreateRtpPage.payeeNameLabel')}
        name="payee.name"
        control={control}
      />
      <Stack direction="row" gap={2} my={1}>
        <FormField
          label={t('CreateRtpPage.payeeIdLabel')}
          name="payee.payeeId"
          control={control}
        />
        <FormField
          label={t('CreateRtpPage.payTrxRefLabel')}
          name="payee.payTrxRef"
          control={control}
        />
      </Stack>
    </FormSection>
  );
};
