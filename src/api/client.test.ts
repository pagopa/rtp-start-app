import { describe, it, expect, vi } from 'vitest';
import { Api } from '../../generated/apiClient';
import { Token } from '../../generated/auth/Token';
import { client } from './client';

// Mock environment variables
vi.stubEnv('VITE_API_URL', import.meta.env.VITE_API_URL);

describe('client', () => {
  it('should instantiate the Api client with the correct baseURL', () => {
    expect(client.api).toBeInstanceOf(Api);
    expect(client.api.instance.defaults.baseURL).toBe(import.meta.env.VITE_API_URL);
  });

  it('should instantiate the Token client with the correct timeout', () => {
    expect(client.auth).toBeInstanceOf(Token);
    expect(client.auth.instance.defaults.timeout).toBe(20000);
  });
});
