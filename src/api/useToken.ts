import { useMutation } from "@tanstack/react-query";
import { client } from "./client";
import {
  GetAccessTokenByPassword,
  OfflineAccessScope,
  PasswordGrantType,
} from "generated/auth/data-contracts";

export const useToken = () => {
  const auth = useMutation({
    mutationKey: ["getToken"],
    mutationFn: async (
      data: Pick<GetAccessTokenByPassword, "username" | "password">,
    ) =>
      await client.auth.getAccessTokens(
        {
          ...data,
          client_id: import.meta.env.VITE_AUTH_CLIENT_ID,
          grant_type: PasswordGrantType.Password,
          scope: OfflineAccessScope.OfflineAccess,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json;charset=UTF-8",
          },
        },
      ),
    onSuccess: ({ data }) => {
      localStorage.setItem("accessToken", data.access_token);
      if (data?.refresh_token) {
        localStorage.setItem("refreshToken", data.refresh_token);
      }
    },
  });

  return auth;
};
