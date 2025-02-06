import { Client } from "../models/Client";
import { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useRefreshToken } from "./useRefreshToken";

export const setupInterceptors = (client: Client) => {
  const refreshToken = useRefreshToken();
  client.instance.interceptors.request.use(
    (request: InternalAxiosRequestConfig) => {
      const accessToken = window.localStorage.getItem("accessToken");
      if (accessToken) {
        request.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return request;
    },
    (error: Promise<AxiosError>) => {
      return Promise.reject(error);
    },
  );
  client.instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        const refresh_token = localStorage.getItem("refreshToken");
        if (refresh_token) {
          refreshToken.mutate({ refresh_token });
        } else throw error;
      } else throw error;
    },
  );
};
