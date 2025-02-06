import { useMutation } from "@tanstack/react-query";
import { client } from "./client";
import {
  RefreshAccessToken,
  RefreshGrantType,
} from "generated/auth/data-contracts";

export const useRefreshToken = () => {
  const auth = useMutation({
    mutationKey: ["getToken"],
    mutationFn: async (data: Pick<RefreshAccessToken, "refresh_token">) =>
      await client.auth.getAccessTokens(
        {
          ...data,
          grant_type: RefreshGrantType.RefreshToken,
          client_id: import.meta.env.VITE_AUTH_CLIENT_ID,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json;charset=UTF-8",
          },
        },
      ),
  });

  return auth;
};
