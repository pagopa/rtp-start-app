import { describe, it, expect, vi, Mock, beforeEach } from 'vitest';
import { useMutation } from '@tanstack/react-query';
import { useRtps } from './useRtps';
import { client } from './client';
import { CreateRtp } from 'generated/apiClient';
import { AxiosError } from 'axios';
import { v4 as uuidv4 } from 'uuid';

// Mock @tanstack/react-query
vi.mock('@tanstack/react-query', () => ({
  useMutation: vi.fn(),
}));

// Mock client
vi.mock('./client', () => ({
  client: {
    api: {
      rtps: {
        createRtp: vi.fn(),
      },
    },
  },
}));

// Mock uuid
vi.mock('uuid', () => ({
  v4: vi.fn(),
}));

describe('useRtps', () => {
  const mutateMock = vi.fn();
  const mutationResult = { mutate: mutateMock };

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();

    // Mock useMutation to return a controlled result
    (useMutation as Mock).mockReturnValue(mutationResult);

    // Mock uuidv4 to return a fixed value for testing
    (uuidv4 as Mock).mockReturnValue('mocked-uuid');
  });

  it('should call useMutation with the correct mutationKey and mutationFn', () => {
    useRtps();

    expect(useMutation).toHaveBeenCalledWith({
      mutationKey: ['createRtp'],
      mutationFn: expect.any(Function),
      onError: expect.any(Function),
    });
  });

  it('should call client.api.rtps.createRtp with the correct parameters', async () => {
    const testData: CreateRtp = {
      payee: {
        payeeId: '77777777777', // Valid PayeeId
        name: 'Comune di Roma',
        payTrxRef: 'ABC/124',
      },
      payer: {
        payerId: 'ABCDEF12G34H567I', // Valid PayerId
        name: 'Mario Rossi',
      },
      paymentNotice: {
        noticeNumber: '311111111112222222', // Valid NoticeNumber
        amount: 10000, // Valid AmountEuroCents
        description: 'Payment for TARI 2025',
        subject: 'TARI 2025',
        expiryDate: '2024-12-03', // Valid ISO 8601 date
      },
    };

    useRtps();

    // Get the mutation function passed to useMutation
    const mutationFn = (useMutation as Mock).mock.calls[0][0].mutationFn;

    // Call the mutation function with test data
    await mutationFn(testData);

    // Verify that client.api.rtps.createRtp was called with the correct parameters
    expect(client.api.rtps.createRtp).toHaveBeenCalledWith(testData, {
      headers: {
        version: 'v1',
        requestId: 'mocked-uuid',
        'content-type': 'application/json',
      },
    });
  });

  it('should return the result of useMutation', () => {
    const result = useRtps();

    expect(result).toBe(mutationResult);
  });

  it('should handle errors using the onError handler', async () => {
    const error = new Error('API error') as AxiosError;

    // Mock client.api.rtps.createRtp to throw an error
    (client.api.rtps.createRtp as Mock).mockRejectedValueOnce(error);

    useRtps();

    // Get the mutation function passed to useMutation
    const mutationFn = (useMutation as Mock).mock.calls[0][0].mutationFn;

    // Call the mutation function and expect it to throw
    await expect(mutationFn({} as CreateRtp)).rejects.toThrow(error);
  });
});
