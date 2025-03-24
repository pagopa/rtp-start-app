import { Stack } from '@mui/material';
import PaymentsIcon from '@mui/icons-material/Payments';
import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { CreateRtp } from 'generated/apiClient';
import { FormField } from 'src/components/FormField';
import { FormSection } from 'src/components/FormSection';

type PaymentNoticeSectionProps = {
  control: Control<CreateRtp>;
};

export const PaymentNoticeSection = ({ control }: PaymentNoticeSectionProps) => {
  const { t } = useTranslation();

  return (
    <FormSection
      title={t('CreateRtpPage.paymentNoticeSectionTitle')}
      icon={<PaymentsIcon />}
    >
      <FormField
        label={t('CreateRtpPage.noticeNumberLabel')}
        name="paymentNotice.noticeNumber"
        control={control}
        textHelper={t('CreateRtpPage.textHelper.paymentNotice.noticeNumber')}
      />
      <Stack direction="row" gap={2} my={1}>
        <FormField
          label={t('CreateRtpPage.amountLabel')}
          name="paymentNotice.amount"
          type="string"
          control={control}
          textHelper={t('CreateRtpPage.textHelper.paymentNotice.amount')}
          isAmount={true}
        />
        <FormField
          label={t('CreateRtpPage.expiryDateLabel')}
          name="paymentNotice.expiryDate"
          type="date"
          control={control}
        />
      </Stack>
      <Stack direction="row" gap={2} mb={1}>
        <FormField
          label={t('CreateRtpPage.subjectLabel')}
          name="paymentNotice.subject"
          control={control}
          textHelper={t('CreateRtpPage.textHelper.paymentNotice.subject')}
        />
        <FormField
          label={t('CreateRtpPage.descriptionLabel')}
          name="paymentNotice.description"
          control={control}
          textHelper={t('CreateRtpPage.textHelper.paymentNotice.description')}
        />
      </Stack>
    </FormSection>
  );
};
