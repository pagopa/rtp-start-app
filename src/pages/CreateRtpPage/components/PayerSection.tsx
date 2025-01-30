import { Stack } from '@mui/material';
import BadgeIcon from '@mui/icons-material/Badge';
import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { CreateRtp } from 'generated/apiClient';
import { FormField } from 'src/components/FormField';
import { FormSection } from 'src/components/FormSection';

type PayerSectionProps = {
  control: Control<CreateRtp>;
};

export const PayerSection = ({ control }: PayerSectionProps) => {
  const { t } = useTranslation();

  return (
    <FormSection
      title={t('CreateRtpPage.payerSectionTitle')}
      icon={<BadgeIcon />}
    >
      <Stack direction="row" gap={2}>
        <FormField
          label={t('CreateRtpPage.payerNameLabel')}
          name="payer.name"
          control={control}
        />
        <FormField
          label={t('CreateRtpPage.payerIdLabel')}
          name="payer.payerId"
          control={control}
        />
      </Stack>
    </FormSection>
  );
};
