import { Stack, Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRtps } from 'src/api/useRtps';
import { CreateRtp } from 'generated/apiClient';
import { LoadingButton } from '@mui/lab';
import { PageTitle } from 'src/components/PageTitle';
import { PayeeSection } from './components/PayeeSection';
import { PayerSection } from './components/PayerSection';
import { PaymentNoticeSection } from './components/PaymentNoticeSection';
import { getValidationSchema } from './resolver';
import { useNavigate } from '@tanstack/react-router';

export const CreateRtpPage = () => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<CreateRtp>({
    resolver: yupResolver(getValidationSchema()),
  });
  const { mutate, isPending, isError, error } = useRtps();
  const navigate = useNavigate();

  const onSubmit = (data: CreateRtp) => {
    console.debug(data);
    mutate(data, {
      onSuccess: () => navigate({ to: '/ok' }),
      onError: () => navigate({ to: '/ko' }),
    });
  };

  return (
    <Stack p={3} gap={3}>
      <PageTitle
        title={t('CreateRtpPage.title')}
        description={t('CreateRtpPage.description')}
      />
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
        <PayeeSection control={control} />
        <PayerSection control={control} />
        <PaymentNoticeSection control={control} />
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
