import { Api } from '../../generated/apiClient';
import { Token } from '../../generated/auth/Token';

export const client = {
  api: new Api({ baseURL: import.meta.env.VITE_API_URL }),
  auth: new Token(),
};
