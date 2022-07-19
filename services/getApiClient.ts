import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';

import { AlertNotification } from '@/components/AlertNotification';

import { APIError } from '@/types/axios';

import { returnEnv } from '@/utils/returnEnv';
import { TOKEN_PREFIX } from '@/utils/tokensPrefix';

import { parseCookies } from 'nookies';

import { EnvironmentEnum } from '@/enums/environment.enum';

export const getAPIClient = (ctx?: any): AxiosInstance => {
  const cookies = parseCookies(ctx);
  const token = cookies[`${TOKEN_PREFIX}`];

  const api = axios.create({
    baseURL: returnEnv(EnvironmentEnum.API_URL),
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    if (token && config.headers) {
      config.headers['Authorization'] = token;
    }
    return config;
  });

  api.interceptors.response.use(
    (config: AxiosResponse) => {
      return config;
    },
    (error: APIError) => {
      const { response } = error;
      if (response.data.statusCode === 401) {
        AlertNotification({ type: 'error', message: 'Token expirado' });
      } else {
        return Promise.reject(error);
      }
    },
  );
  return api;
};
