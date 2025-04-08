import { Client } from "../models/Client";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { invalidateSession } from "src/utils/auth.utils";
import useMessageStore from "src/stores/message.store";
import { refreshToken } from "./useRefreshToken";

export const setupInterceptors = (client: Client) => {

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

      if (error?.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const currentRefreshToken = localStorage.getItem('refreshToken');
          if(currentRefreshToken) {
            const { access_token, refresh_token } = await refreshToken(currentRefreshToken);
            localStorage.setItem('accessToken', access_token);
            if(refresh_token) {
              localStorage.setItem('refreshToken', refresh_token);
            }

            // Retry the original request
            originalRequest.headers.Authorization = `Bearer ${access_token}`;
            return axios(originalRequest);
          } else {
            invalidateSession();
            return Promise.reject(error);
          }

        } catch {
          invalidateSession();
          return Promise.reject(error);
        }

      }

      const message = error?.response?.status === 401 ? "unauthorized" : "default";
      useMessageStore.getState().setMessageStatus(message, error?.response?.status);
      return Promise.reject(error);
    },
  );
};