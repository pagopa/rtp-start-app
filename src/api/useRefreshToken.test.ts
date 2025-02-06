import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { useMutation } from '@tanstack/react-query';
import { useRefreshToken } from './useRefreshToken';
import { client } from './client';
import { RefreshGrantType } from 'generated/auth/data-contracts';

// Mock @tanstack/react-query
vi.mock('@tanstack/react-query', () => ({
  useMutation: vi.fn(),
}));

// Mock client
vi.mock('./client', () => ({
  client: {
    auth: {
      getAccessTokens: vi.fn(),
    },
  },
}));

describe('useRefreshToken', () => {
  const mutateMock = vi.fn();
  const mutationResult = { mutate: mutateMock };

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();

    // Mock useMutation to return a controlled result
    (useMutation as Mock).mockReturnValue(mutationResult);
  });

  it('should call useMutation with the correct mutationKey and mutationFn', () => {
    useRefreshToken();

    expect(useMutation).toHaveBeenCalledWith({
      mutationKey: ['getToken'],
      mutationFn: expect.any(Function),
    });
  });

  it('should call client.auth.getAccessTokens with the correct parameters', async () => {
    const refreshToken = 'test-refresh-token';
    const expectedData = {
      refresh_token: refreshToken,
      grant_type: RefreshGrantType.RefreshToken,
      client_id: '1ec1f3f4-411b-4dc3-ad1c-68196af7e90c',
    };
    const expectedHeaders = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json;charset=UTF-8',
      },
    };

    useRefreshToken();

    // Get the mutation function passed to useMutation
    const mutationFn = (useMutation as Mock).mock.calls[0][0].mutationFn;

    // Call the mutation function with test data
    await mutationFn({ refresh_token: refreshToken });

    // Verify that client.auth.getAccessTokens was called with the correct parameters
    expect(client.auth.getAccessTokens).toHaveBeenCalledWith(expectedData, expectedHeaders);
  });

  it('should return the result of useMutation', () => {
    const result = useRefreshToken();

    expect(result).toBe(mutationResult);
  });

  it('should handle errors from client.auth.getAccessTokens', async () => {
    const refreshToken = 'test-refresh-token';
    const error = new Error('API error');

    // Mock client.auth.getAccessTokens to throw an error
    (client.auth.getAccessTokens as Mock).mockRejectedValueOnce(error);

    useRefreshToken();

    // Get the mutation function passed to useMutation
    const mutationFn = (useMutation as Mock).mock.calls[0][0].mutationFn;

    // Call the mutation function and expect it to throw
    await expect(mutationFn({ refresh_token: refreshToken })).rejects.toThrow(error);
  });
});
