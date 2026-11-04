import { describe, it, expect, vi, Mock } from 'vitest';
import { useMutation } from '@tanstack/react-query';
import { useStatusUpdate } from './useStatusUpdate';
import { client } from './client';
import { setupMutationMocks, MOCKED_UUID } from './testUtils';
import { CONTENT_TYPE } from 'src/models/Requests';

vi.mock('@tanstack/react-query', () => ({
  useMutation: vi.fn(),
}));

vi.mock('./client', () => ({
  client: {
    api: {
      rtps: {
        requestRtpStatusUpdate: vi.fn(),
        requestRtpStatusUpdateCancel: vi.fn(),
      },
    },
  },
}));

vi.mock('uuid', () => ({
  v4: vi.fn(),
}));

const expectedHeaders = {
  headers: {
    version: 'v2',
    requestId: MOCKED_UUID,
    'content-type': CONTENT_TYPE.JSON,
  },
};

describe('useStatusUpdate', () => {
  const mutationResult = setupMutationMocks();

  it('should call useMutation with the type as mutationKey', () => {
    useStatusUpdate('statusUpdate');

    expect(useMutation).toHaveBeenCalledWith({
      mutationKey: ['statusUpdate'],
      mutationFn: expect.any(Function),
      onError: expect.any(Function),
    });
  });

  it('should call requestRtpStatusUpdate with v2 headers', async () => {
    useStatusUpdate('statusUpdate');

    const mutationFn = (useMutation as Mock).mock.calls[0][0].mutationFn;
    await mutationFn({ resourceId: 'test-resource-id' });

    expect(client.api.rtps.requestRtpStatusUpdate).toHaveBeenCalledWith(
      { resourceId: 'test-resource-id' },
      expectedHeaders
    );
    expect(client.api.rtps.requestRtpStatusUpdateCancel).not.toHaveBeenCalled();
  });

  it('should call requestRtpStatusUpdateCancel with v2 headers', async () => {
    useStatusUpdate('statusUpdateCancel');

    const mutationFn = (useMutation as Mock).mock.calls[0][0].mutationFn;
    await mutationFn({ resourceId: 'test-resource-id' });

    expect(client.api.rtps.requestRtpStatusUpdateCancel).toHaveBeenCalledWith(
      { resourceId: 'test-resource-id' },
      expectedHeaders
    );
    expect(client.api.rtps.requestRtpStatusUpdate).not.toHaveBeenCalled();
  });

  it('should return the result of useMutation', () => {
    expect(useStatusUpdate('statusUpdate')).toBe(mutationResult);
  });
});
