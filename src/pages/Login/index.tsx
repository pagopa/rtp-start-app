import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useNavigate } from "@tanstack/react-router";
import { GetAccessTokenByPassword } from "generated/auth/data-contracts";
import { useForm } from "react-hook-form";
import { useToken } from "src/api/useToken";
import { FormField } from "src/components/FormField";
import { yupResolver } from "@hookform/resolvers/yup";
import { getValidationSchema } from "./resolver";
import { useTranslation } from "react-i18next";
import Alert from "@mui/material/Alert";
import { useAuth } from "src/hooks/useAuth";
import { userEmail } from "src/utils/userEmail.utils";

type UserCredentials = Pick<GetAccessTokenByPassword, "username" | "password">;

export const Login = () => {
  const { control, handleSubmit } = useForm<UserCredentials>({
    resolver: yupResolver(getValidationSchema()),
  });
  const auth = useAuth();
  const { mutate, isPending, isError } = useToken();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onSubmit = (credentials: UserCredentials) => {
    mutate(credentials, {
      onSuccess: ({ data }) => {
        auth.login({
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          user: userEmail(credentials.username),
        });
      },
    });
  };

  if (auth.isAuthenticated) {
    navigate({ to: "/" });
  }

  return (
    <Stack justifyContent="center" alignItems="center" py={4} gap={4}>
      <Stack
        justifyContent="center"
        textAlign="center"
        maxWidth={{ xs: "480px", lg: "sm" }}
        gap={4}
      >
        <Stack gap={1.3}>
          <Typography variant="h3" component="h1">
            {t("Login.title")}
          </Typography>
          <Typography variant="body1">{t("Login.description")}</Typography>
        </Stack>
        <Stack
          bgcolor="background.paper"
          borderRadius={2}
          gap={3}
          p={4}
          sx={{ boxShadow: "0px 6px 30px 5px #002B551A" }}
        >
          <Typography variant="h6" component="h2">
            {t("Login.form.title")}
          </Typography>
          {isError && (
            <Alert variant="outlined" severity="error">
              {t("Login.form.error")}
            </Alert>
          )}
          <Stack gap={3} component="form">
            <FormField
              type="email"
              label={t("Login.form.username")}
              name="username"
              control={control}
            />
            <FormField
              type="password"
              label={t("Login.form.password")}
              name="password"
              control={control}
              autocompleteOff={true}
            />
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              disabled={isPending}
              loading={isPending}
              onClick={handleSubmit(onSubmit)}
            >
              {t("Login.form.button")}
            </LoadingButton>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
