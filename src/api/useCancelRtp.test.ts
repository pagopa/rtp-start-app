import { describe, it, expect, vi, Mock, beforeEach } from 'vitest';
import { useMutation } from '@tanstack/react-query';
import { useCancelRtp, CancelRtpParams } from './useCancelRtp';
import { CancelReason } from 'generated/apiClient';
import { client } from './client';
import { v4 as uuidv4 } from 'uuid';

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
  const mutateMock = vi.fn();
  const mutationResult = { mutate: mutateMock };

  beforeEach(() => {
    vi.clearAllMocks();
    (useMutation as Mock).mockReturnValue(mutationResult);
    (uuidv4 as Mock).mockReturnValue('mocked-uuid');
  });

  it('should call useMutation with the correct mutationKey and mutationFn', () => {
    useCancelRtp();

    expect(useMutation).toHaveBeenCalledWith({
      mutationKey: ['cancelRtp'],
      mutationFn: expect.any(Function),
    });
  });

  it('should call client.api.rtps.cancelRtp with correct body and headers for MODT', async () => {
    const params: CancelRtpParams = { rtpId: 'test-rtp-id', reason: CancelReason.MODT };

    useCancelRtp();

    const mutationFn = (useMutation as Mock).mock.calls[0][0].mutationFn;
    await mutationFn(params);

    expect(client.api.rtps.cancelRtp).toHaveBeenCalledWith(
      { resourceId: 'test-rtp-id', reason: CancelReason.MODT },
      {
        headers: {
          version: 'v1',
          requestId: 'mocked-uuid',
        },
      }
    );
  });

  it('should call client.api.rtps.cancelRtp with correct body and headers for PAID', async () => {
    const params: CancelRtpParams = { rtpId: 'test-rtp-id', reason: CancelReason.PAID };

    useCancelRtp();

    const mutationFn = (useMutation as Mock).mock.calls[0][0].mutationFn;
    await mutationFn(params);

    expect(client.api.rtps.cancelRtp).toHaveBeenCalledWith(
      { resourceId: 'test-rtp-id', reason: CancelReason.PAID },
      expect.objectContaining({ headers: expect.any(Object) })
    );
  });

  it('should return the result of useMutation', () => {
    const result = useCancelRtp();

    expect(result).toBe(mutationResult);
  });
});
