import { create } from "zustand";

export type Auth = {
  login: ({
    accessToken,
    refreshToken,
    user,
  }: {
    accessToken: string;
    refreshToken?: string;
    user: string;
  }) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

export const useAuth = create<Auth>((set) => ({
  isAuthenticated: localStorage.getItem("accessToken") !== null,
  login: ({
    accessToken,
    refreshToken,
    user,
  }: {
    accessToken: string;
    refreshToken?: string;
    user: string;
  }) => {
    set({ isAuthenticated: true });
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", user);
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }
  },
  logout: () => {
    set({ isAuthenticated: false });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  },
}));
