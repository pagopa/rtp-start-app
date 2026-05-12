import { vi, Mock, beforeEach } from 'vitest';
import { useMutation } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

export const MOCKED_UUID = 'mocked-uuid';

export function setupMutationMocks() {
  const mutateMock = vi.fn();
  const mutationResult = { mutate: mutateMock };

  beforeEach(() => {
    vi.clearAllMocks();
    (useMutation as Mock).mockReturnValue(mutationResult);
    (uuidv4 as Mock).mockReturnValue(MOCKED_UUID);
  });

  return mutationResult;
}
