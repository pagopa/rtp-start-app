import { describe, it, expect, vi, Mock } from 'vitest';
import { useMutation } from '@tanstack/react-query';
import { useCancelRtp, CancelRtpParams } from './useCancelRtp';
import { CancelReason } from 'generated/apiClient';
import { client } from './client';
import { setupMutationMocks, MOCKED_UUID } from './testUtils';

vi.mock('@tanstack/react-query', () => ({
  useMutation: vi.fn(),
}));

vi.mock('./client', () => ({
  client: {
    api: {
      rtps: {
        cancelRtp: vi.fn(),
      },
    },
  },
}));

vi.mock('uuid', () => ({
  v4: vi.fn(),
}));

describe('useCancelRtp', () => {
  const mutationResult = setupMutationMocks();

  it('should call useMutation with the correct mutationKey and mutationFn', () => {
    useCancelRtp();

    expect(useMutation).toHaveBeenCalledWith({
      mutationKey: ['cancelRtp'],
      mutationFn: expect.any(Function),
    });
  });

  it.each([
    { reason: CancelReason.MODT },
    { reason: CancelReason.PAID },
  ])('should call client.api.rtps.cancelRtp with correct body and headers for $reason', async ({ reason }) => {
    const params: CancelRtpParams = { rtpId: 'test-rtp-id', reason };

    useCancelRtp();

    const mutationFn = (useMutation as Mock).mock.calls[0][0].mutationFn;
    await mutationFn(params);

    expect(client.api.rtps.cancelRtp).toHaveBeenCalledWith(
      { resourceId: 'test-rtp-id', reason },
      {
        headers: {
          version: 'v1',
          requestId: MOCKED_UUID,
        },
      }
    );
  });

  it('should return the result of useMutation', () => {
    const result = useCancelRtp();

    expect(result).toBe(mutationResult);
  });
});

