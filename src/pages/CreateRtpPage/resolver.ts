import * as yup from 'yup';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

// In a function so we can use hooks
// and translate validation messages
export const getValidationSchema = () => {
  const { t } = useTranslation();

  return yup.object({
    payee: yup.object({
      name: yup
        .string()
        .max(140, t('CreateRtpPage.validation.payee.name.max'))
        .required(t('CreateRtpPage.validation.payee.name.required')),
      payeeId: yup
        .string()
        .required(t('CreateRtpPage.validation.payee.payeeId.required')),
      payTrxRef: yup
        .string()
        .required(t('CreateRtpPage.validation.payee.payTrxRef.required')),
    }),
    payer: yup.object({
      name: yup
        .string()
        .required(t('CreateRtpPage.validation.payer.name.required')),
      payerId: yup
        .string()
        .required(t('CreateRtpPage.validation.payer.payerId.required')),
    }),
    paymentNotice: yup.object({
      noticeNumber: yup
        .string()
        .matches(/^\d{18}$/, t('CreateRtpPage.validation.paymentNotice.noticeNumber.matches'))
        .required(t('CreateRtpPage.validation.paymentNotice.noticeNumber.required')),
      amount: yup
        .mixed<number>()
        .transform((value) => {
          const normalizedValue = value?.replace(',', '.'); 
          return normalizedValue ? parseFloat(normalizedValue) : 0;
        })
        .test('greater-than-zero',
          t('CreateRtpPage.validation.paymentNotice.amount.greaterThanZero'),
          (value) => (value !== undefined) && (value > 0)
        )
        .test(
          'max-amount',
          t('CreateRtpPage.validation.paymentNotice.amount.lessThan'),
          (value) => (value !== undefined) && (value <= 999999999.99)
        )
        .required(t('CreateRtpPage.validation.paymentNotice.amount.required')),
      expiryDate: yup
        .string()
        .required(t('CreateRtpPage.validation.paymentNotice.expiryDate.required'))
        .transform((value) => dayjs(value).format('YYYY-MM-DD')),
      subject: yup
        .string()
        .required(t('CreateRtpPage.validation.paymentNotice.subject.required')),
      description: yup
        .string()
        .required(t('CreateRtpPage.validation.paymentNotice.description.required')),
    }),
  });
};
