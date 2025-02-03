import { AppState } from 'src/models/AppState';

export const useAuth = (): AppState['auth'] => {
  const token = localStorage.getItem('accessToken');

  return { isAuthenticated: !!token };
};
