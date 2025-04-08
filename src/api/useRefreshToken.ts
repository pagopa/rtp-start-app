import { client } from "./client";
import {
  RefreshGrantType,
} from "generated/auth/data-contracts";
import { ACCEPT_FORMAT, CONTENT_TYPE } from "src/models/Requests";

export const refreshToken = async (refreshToken: string) => {
  const response = await client.auth.getAccessTokens(
    {
      refresh_token: refreshToken,
      grant_type: RefreshGrantType.RefreshToken,
      client_id: import.meta.env.VITE_AUTH_CLIENT_ID,
    },
    {
      headers: {
        "Content-Type": CONTENT_TYPE.URL_ENCODED,
        Accept: ACCEPT_FORMAT.JSON,
      },
    }
  );
  return response.data;
};