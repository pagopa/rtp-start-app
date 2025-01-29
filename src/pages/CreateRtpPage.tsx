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
  const { control, handleSubmit } = useForm<CreateRtp>({
    resolver: yupResolver(validationSchema),
  });
  const { mutate, isPending, isError, error } = useRtps();

  const onSubmit = (data: CreateRtp) => {
    console.debug(data);
    mutate(data, {
      onSuccess: () => alert('RTP created successfully!'),
      onError: () => alert('Failed to create RTP'),
    });
  };

  return (
    <Stack p={3} gap={3}>
      <Stack gap={1}>
        <Typography variant="h4" component="h1">
          Nuova Richiesta di pagamento
        </Typography>
        <Typography variant="body2">
          Completa le informazioni necessarie per la creazione di una richiesta
          di pagamento (SRTP)
        </Typography>
      </Stack>
      <Stack p={3} gap={3} bgcolor="background.paper">
        <Stack justifyContent="flex-start" gap={1}>
          <Typography variant="h6" component="h2">
            Compila la richiesta con le informazioni necessarie
          </Typography>
          <Typography variant="body2">
            La creazione di una RTP permette di inviare una richiesta di
            pagamento direttamente al destinatario, in sostituzione dell’avviso
            cartaceo o digitale.
          </Typography>
          <Box>
            <Button variant="naked">Dubbi? Vai alla documentazione</Button>
          </Box>
        </Stack>
        {/* Payee Section */}
        <FormSection title="Ente Creditore" icon={<BadgeIcon />}>
          <FormField label="Nome" name="payee.name" control={control} />
          <Stack direction="row" gap={2}>
            <FormField
              label="Codice fiscale (Payee ID)"
              name="payee.payeeId"
              control={control}
            />
            <FormField
              label="Numero di protocollo ente (PayTrxRef)"
              name="payee.payTrxRef"
              control={control}
            />
          </Stack>
        </FormSection>

        {/* Payer */}
        <FormSection title="Destinatario" icon={<BadgeIcon />}>
          <Stack direction="row" gap={2}>
            <FormField label="Nome" name="payer.name" control={control} />
            <FormField
              label="Codice fiscale (Payer ID)"
              name="payer.payerId"
              control={control}
            />
          </Stack>
        </FormSection>

        {/* Payment Notice Section */}
        <FormSection title="Dati avviso di pagamento" icon={<PaymentsIcon />}>
          <FormField
            label="Codice avviso pagoPA"
            name="paymentNotice.noticeNumber"
            control={control}
          />
          <Stack direction="row" gap={2}>
            <FormField
              label="Importo (euro cents)"
              name="paymentNotice.amount"
              type="number"
              control={control}
            />
            <FormField
              label="Data di scadenza"
              name="paymentNotice.expiryDate"
              type="date"
              control={control}
            />
          </Stack>
          <Stack direction="row" gap={2}>
            <FormField
              label="Oggetto del pagamento"
              name="paymentNotice.subject"
              control={control}
            />
            <FormField
              label="Descrizione del pagamento"
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
        {'Vai al riepilogo'}
      </LoadingButton>

      {isError && (
        <Typography color="error">{error?.message}</Typography>
      )}
    </Stack>
  );
};
