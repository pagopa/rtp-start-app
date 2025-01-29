import { useTranslation } from 'react-i18next';
import BadgeIcon from '@mui/icons-material/Badge';
import PaymentsIcon from '@mui/icons-material/Payments';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useForm, Controller, Control, FieldPath } from 'react-hook-form';
import { useRtps } from 'src/api/useRtps';
import { CreateRtp } from 'generated/apiClient';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './resolver';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';

type FormFieldProps = {
  label: string;
  name: FieldPath<CreateRtp>;
  type?: 'text' | 'number' | 'date';
  control: Control<CreateRtp>;
};

const FormField = ({ label, name, type = 'text', control }: FormFieldProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { error } }) =>
      type === 'date' ? (
        <DatePicker
          {...field}
          label={label}
          sx={{ width: '100%' }}
          slotProps={{
            textField: { error: !!error, helperText: error?.message },
          }}
        />
      ) : (
        <TextField
          {...field}
          label={label}
          variant="outlined"
          type={type}
          fullWidth
          error={!!error}
          helperText={error?.message}
        />
      )
    }
  />
);

type FormSectionProps = {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

const FormSection = ({ title, icon, children }: FormSectionProps) => (
  <Stack
    border={1}
    borderRadius={2}
    borderColor="#E3E7EB"
    bgcolor="background.paper"
    p={3}
    gap={3}
  >
    <Stack direction="row" gap={1} alignItems="center">
      {icon}
      <Typography variant="sidenav">{title}</Typography>
    </Stack>
    {children}
  </Stack>
);

export const CreateRtpPage = () => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<CreateRtp>({
    resolver: yupResolver(validationSchema),
  });
  const { mutate, isPending, isError, error } = useRtps();

  const onSubmit = (data: CreateRtp) => {
    console.debug(data);
    mutate(data, {
      onSuccess: () => alert(t('CreateRtpPage.rtpCreatedSuccess')),
      onError: () => alert(t('CreateRtpPage.rtpCreationFailed')),
    });
  };

  return (
    <Stack p={3} gap={3}>
      <Stack gap={1}>
        <Typography variant="h4" component="h1">
          {t('CreateRtpPage.title')}
        </Typography>
        <Typography variant="body2">
          {t('CreateRtpPage.description')}
        </Typography>
      </Stack>
      <Stack p={3} gap={3} bgcolor="background.paper">
        <Stack justifyContent="flex-start" gap={1}>
          <Typography variant="h6" component="h2">
            {t('CreateRtpPage.formTitle')}
          </Typography>
          <Typography variant="body2">
            {t('CreateRtpPage.formDescription')}
          </Typography>
          <Box>
            <Button variant="naked">
              {t('CreateRtpPage.documentationButton')}
            </Button>
          </Box>
        </Stack>
        {/* Payee Section */}
        <FormSection
          title={t('CreateRtpPage.payeeSectionTitle')}
          icon={<BadgeIcon />}
        >
          <FormField
            label={t('CreateRtpPage.payeeNameLabel')}
            name="payee.name"
            control={control}
          />
          <Stack direction="row" gap={2}>
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

        {/* Payer Section */}
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

        {/* Payment Notice Section */}
        <FormSection
          title={t('CreateRtpPage.paymentNoticeSectionTitle')}
          icon={<PaymentsIcon />}
        >
          <FormField
            label={t('CreateRtpPage.noticeNumberLabel')}
            name="paymentNotice.noticeNumber"
            control={control}
          />
          <Stack direction="row" gap={2}>
            <FormField
              label={t('CreateRtpPage.amountLabel')}
              name="paymentNotice.amount"
              type="number"
              control={control}
            />
            <FormField
              label={t('CreateRtpPage.expiryDateLabel')}
              name="paymentNotice.expiryDate"
              type="date"
              control={control}
            />
          </Stack>
          <Stack direction="row" gap={2}>
            <FormField
              label={t('CreateRtpPage.subjectLabel')}
              name="paymentNotice.subject"
              control={control}
            />
            <FormField
              label={t('CreateRtpPage.descriptionLabel')}
              name="paymentNotice.description"
              control={control}
            />
          </Stack>
        </FormSection>
      </Stack>
      <LoadingButton
        type="submit"
        variant="contained"
        color="primary"
        disabled={isPending}
        loading={isPending}
        sx={{ alignSelf: 'flex-end' }}
        onClick={handleSubmit(onSubmit)}
      >
        {t('CreateRtpPage.submitButton')}
      </LoadingButton>

      {isError && (
        <Typography color="error">{error?.message}</Typography>
      )}
    </Stack>
  );
};
