import dayjs from 'dayjs';
import * as yup from 'yup';

export const validationSchema = yup.object({
  payee: yup.object({
    name: yup.string().max(140).required('Payee name is required'),
    payeeId: yup.string().required('Payee ID is required'),
    payTrxRef: yup.string().required('PayTrxRef is required'),
  }),
  payer: yup.object({
    name: yup.string().required('Payer name is required'),
    payerId: yup.string().required('Payer ID is required'),
  }),
  paymentNotice: yup.object({
    noticeNumber: yup
      .string()
      .matches(/^\d{18}$/, 'Notice number must be 18 digits')
      .required('Notice number is required'),
    amount: yup
      .number()
      .transform((value) => (value?? 0) * 100)
      .positive('Amount must be positive')
      .required('Amount is required')
      .lessThan(1000000000, 'Amount must be less than 1000000000'),
    expiryDate: yup
      .string()
      .required('Expiry date is required')
      .transform((value) => dayjs(value).format('YYYY-MM-DD')),
    subject: yup.string().required('Subject is required'),
    description: yup.string().required('Description is required'),
  }),
});
