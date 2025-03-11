import { Client } from "../models/Client";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useRefreshToken } from "./useRefreshToken";
import { invalidateSession } from "src/utils/auth.utils";

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
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const currentRefreshToken = localStorage.getItem('refreshToken');
          if(currentRefreshToken) {
            const response = await refreshToken.mutateAsync({ refresh_token: currentRefreshToken });
            const { access_token, refresh_token } = response.data;
            localStorage.setItem('accessToken', access_token);
            if(refresh_token) {
              localStorage.setItem('refreshToken', refresh_token);
            }

            // Retry the original request
            originalRequest.headers.Authorization = `Bearer ${access_token}`;
            return axios(originalRequest);
          } else {
            invalidateSession();
          }

        } catch {
          invalidateSession();
        }

      }

      return Promise.reject(error);
    },
  );
};