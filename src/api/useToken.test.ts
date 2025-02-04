import { describe, it, expect, vi, Mock, beforeEach, afterEach } from 'vitest';
import { useMutation } from '@tanstack/react-query';
import { useToken } from './useToken';

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

describe('useToken', () => {
  const mutateMock = vi.fn();
  const mutationResult = { mutate: mutateMock };

  // Mock localStorage
  let localStorageMock: Record<string, string> = {};

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();

    // Mock useMutation to return a controlled result
    (useMutation as Mock).mockImplementation((options) => {
      // Simulate the onSuccess handler
      if (options.onSuccess) {
        options.onSuccess({ data: { access_token: 'test-access-token' } });
      }
      return mutationResult;
    });

    // Mock localStorage
    global.Storage.prototype.setItem = vi.fn((key, value) => {
      localStorageMock[key] = value;
    });
    global.Storage.prototype.getItem = vi.fn((key) => localStorageMock[key] || null);
    global.Storage.prototype.clear = vi.fn(() => {
      localStorageMock = {};
    });
  });

  afterEach(() => {
    // Restore the original Storage methods after each test
    vi.restoreAllMocks();
  });

  it('should call useMutation with the correct mutationKey and mutationFn', () => {
    useToken();

    expect(useMutation).toHaveBeenCalledWith({
      mutationKey: ['getToken'],
      mutationFn: expect.any(Function),
      onSuccess: expect.any(Function),
    });
  });

});
