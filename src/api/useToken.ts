import { useMutation } from "@tanstack/react-query";
import { client } from "./client";
import {
  GetAccessTokenByPassword,
  OfflineAccessScope,
  PasswordGrantType,
} from "generated/auth/data-contracts";
import { ACCEPT_FORMAT, CONTENT_TYPE } from "src/models/Requests";

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
            "Content-Type": CONTENT_TYPE.URL_ENCODED,
            Accept: ACCEPT_FORMAT.JSON,
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
