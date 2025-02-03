import { useMutation } from '@tanstack/react-query';
import { client } from './client';
import { GetAccessTokenByPassword } from 'generated/auth/data-contracts';

export const useToken = () => {
  const auth = useMutation({
    mutationKey: ['getToken'],
    mutationFn: async (data: GetAccessTokenByPassword) =>
      await client.auth.getAccessTokens(data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json;charset=UTF-8',
        },
      }),
  });

  return auth;
};
