import { describe, it, expect, vi } from 'vitest';
import { client } from './client'; // importa il client da mockare
import { RefreshGrantType } from 'generated/auth/data-contracts';
import { ACCEPT_FORMAT, CONTENT_TYPE } from 'src/models/Requests';
import { refreshToken } from './useRefreshToken';
import { Mock } from 'vitest';

vi.mock('./client', () => ({
  client: {
    auth: {
      getAccessTokens: vi.fn(),
    },
  },
}));

describe('refreshToken', () => {
  it('should call getAccessTokens with correct parameters and return data', async () => {
    const refreshTokenMock = 'refresh-token';
    const responseDataMock = { access_token: 'new-access-token' };

    (client.auth.getAccessTokens as Mock).mockResolvedValueOnce({
      data: responseDataMock,
    });

    const result = await refreshToken(refreshTokenMock);

    expect(client.auth.getAccessTokens).toHaveBeenCalledWith(
      {
        refresh_token: refreshTokenMock,
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

    expect(result).toEqual(responseDataMock);
  });

  it('should throw an error if getAccessTokens fails', async () => {
    const refreshTokenMock = 'mock-refresh-token';
    const errorMessage = 'API Error';

    (client.auth.getAccessTokens as Mock).mockRejectedValue(new Error(errorMessage));

    await expect(refreshToken(refreshTokenMock)).rejects.toThrow(errorMessage);
  });
});
