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
      // required first, so an empty field shows "required" instead of "invalid UUID"
      .required(t('StatusUpdatePage.validation.resourceId.required'))
      .uuid(t('StatusUpdatePage.validation.resourceId.uuid')),
  });
};
