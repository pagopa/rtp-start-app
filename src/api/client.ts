import { Api } from "../../generated/apiClient";
import { Token } from "../../generated/auth/Token";

export const client = {
  api: new Api({ baseURL: import.meta.env.VITE_API_URL }),
  auth: new Token({ timeout: 20000, baseURL: import.meta.env.VITE_AUTH_URL }),
};
