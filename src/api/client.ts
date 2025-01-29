import { Api } from '../../generated/apiClient';

export const client = {
  api: new Api({ baseURL: import.meta.env.API_URL }),
};
