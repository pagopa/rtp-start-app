import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

// In a function so we can use hooks
// and translate validation messages
export const getValidationSchema = () => {
  const { t } = useTranslation();

  return yup.object({
    resourceId: yup
      .string()
      .trim()
      .uuid(t('StatusUpdatePage.validation.resourceId.uuid'))
      .required(t('StatusUpdatePage.validation.resourceId.required')),
  });
};
