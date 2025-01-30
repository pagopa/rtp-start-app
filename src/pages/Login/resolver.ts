import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

// In a function so we can use hooks
// and translate validation messages
export const getValidationSchema = () => {
  const { t } = useTranslation();

  return yup.object({
    username: yup.string().required(t('Login.validation.username.required')),
    password: yup.string().required(t('Login.validation.password.required')),
  });
};
