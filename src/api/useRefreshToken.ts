import { useMutation } from "@tanstack/react-query";
import { client } from "./client";
import {
  RefreshAccessToken,
  RefreshGrantType,
} from "generated/auth/data-contracts";
import { ACCEPT_FORMAT, CONTENT_TYPE } from "src/models/Requests";

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
            "Content-Type": CONTENT_TYPE.URL_ENCODED,
            Accept: ACCEPT_FORMAT.JSON,
          },
        },
      ),
  });

  return auth;
};
