import { Client } from '../models/Client';
import { AxiosError, InternalAxiosRequestConfig } from 'axios';

export const setupInterceptors = (client: Client) => {
  client.instance.interceptors.request.use(
    (request: InternalAxiosRequestConfig) => {
      const accessToken = window.localStorage.getItem('accessToken');
      if (accessToken) {
        request.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return request;
    },
    (error: Promise<AxiosError>) => {
      return Promise.reject(error);
    }
  );
  client.instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        console.log('401');
      }
    }
  );
};
