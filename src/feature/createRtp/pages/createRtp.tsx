import BadgeIcon from "@mui/icons-material/Badge";
import PaymentsIcon from "@mui/icons-material/Payments";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";

type Inputs = {
  example: string;
  exampleRequired: string;
};

const FormBox = ({ children }: { children: React.ReactNode }) => (
  <Stack
    border={1}
    borderRadius={2}
    borderColor="#E3E7EB"
    px={3}
    py={2}
    gap={2}
    children={children}
  />
);

export const CreateRtp = () => {
  const { register } = useForm<Inputs>();

  return (
    <Stack p={3} gap={3}>
      <FormBox>
        <Stack direction="row" gap={1} alignItems="center">
          <BadgeIcon />
          <Typography variant="sidenav">Ente Creditore</Typography>
        </Stack>
        <TextField label="Nome" variant="outlined" {...register("example")} />

        <Stack direction="row" gap={1} justifyContent="space-between">
          <TextField
            sx={{ width: "100%" }}
            label="Codice fiscale"
            variant="outlined"
            {...register("example")}
          />

          <TextField
            sx={{ width: "100%" }}
            label="Numero di protocollo ente"
            variant="outlined"
            {...register("example")}
          />
        </Stack>
      </FormBox>

      <FormBox>
        <Stack direction="row" gap={1} alignItems="center">
          <BadgeIcon />
          <Typography variant="sidenav">Destinatario</Typography>
        </Stack>
        <Stack direction="row" gap={1} justifyContent="space-between">
          <TextField
            sx={{ width: "100%" }}
            label="Nome"
            variant="outlined"
            {...register("example")}
          />

          <TextField
            sx={{ width: "100%" }}
            label="Codice fiscale"
            variant="outlined"
            {...register("example")}
          />
        </Stack>
      </FormBox>

      <FormBox>
        <Stack direction="row" gap={1} alignItems="center">
          <PaymentsIcon />
          <Typography variant="sidenav">Dati avviso di pagamento</Typography>
        </Stack>
        <TextField label="Codice avviso pagoPA" variant="outlined" {...register("example")} />

        <Stack direction="row" gap={1} justifyContent="space-between">
          <TextField
            sx={{ width: "100%" }}
            label="Importo"
            variant="outlined"
            {...register("example")}
          />

          <TextField
            sx={{ width: "100%" }}
            label="Data di scadenza"
            variant="outlined"
            {...register("example")}
          />
        </Stack>

        <Stack direction="row" gap={1} justifyContent="space-between">
          <TextField
            sx={{ width: "100%" }}
            label="Oggetto del pagamento"
            variant="outlined"
            {...register("example")}
          />

          <TextField
            sx={{ width: "100%" }}
            label="Descrizione del pagamento"
            variant="outlined"
            {...register("example")}
          />
        </Stack>
      </FormBox>
    </Stack>
  );
};
