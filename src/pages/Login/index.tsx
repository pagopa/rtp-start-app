import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate } from '@tanstack/react-router';
import {
  GetAccessTokenByPassword,
  PasswordGrantType,
} from 'generated/auth/data-contracts';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { useToken } from 'src/api/useToken';
import { FormField } from 'src/components/FormField';
import { yupResolver } from '@hookform/resolvers/yup';
import { getValidationSchema } from './resolver';
import { useTranslation } from 'react-i18next';

type UserCredentials = Pick<GetAccessTokenByPassword, 'username' | 'password'>;

export const Login = () => {
  const { control, handleSubmit } = useForm<UserCredentials>({
    resolver: yupResolver(getValidationSchema()),
  });
  const { mutate, isPending } = useToken();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onSubmit = (data: UserCredentials) => {
    mutate(
      {
        ...data,
        client_id: uuidv4(),
        grant_type: PasswordGrantType.Password,
      },
      {
        onSuccess: ({ data }) => {
          localStorage.setItem('accessToken', data.access_token);
          navigate({ to: '/' });
        },
        onError: () => navigate({ to: '/ko' }),
      },
    );
  };

  return (
    <Stack justifyContent="center" alignItems="center" py={4} gap={4}>
      <Stack
        justifyContent="center"
        textAlign="center"
        maxWidth={{ xs: '480px', lg: 'sm' }}
        gap={4}
      >
        <Stack gap={1.3}>
          <Typography variant="h3" component="h1">
            {t('Login.title')}
          </Typography>
          <Typography variant="body1">{t('Login.description')}</Typography>
        </Stack>
        <Stack
          bgcolor="background.paper"
          borderRadius={2}
          gap={3}
          p={4}
          sx={{ boxShadow: '0px 6px 30px 5px #002B551A' }}
        >
          <Typography variant="h6" component="h2">
            {t('Login.form.title')}
          </Typography>
          <Stack gap={3}>
            <FormField
              label={t('Login.form.username')}
              name="username"
              control={control}
            />
            <FormField
              label={t('Login.form.password')}
              name="password"
              control={control}
            />
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              disabled={isPending}
              loading={isPending}
              onClick={handleSubmit(onSubmit)}
            >
              {t('Login.form.button')}
            </LoadingButton>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
