import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';

import { AlertNotification } from '@components/AlertNotification';

import { APIError } from '@@types/axios';

import { returnEnv } from '@utils/returnEnv';
import { TOKEN_PREFIX } from '@utils/tokensPrefix';

import { destroyCookie, parseCookies } from 'nookies';

import { EnvEnum } from '@enums/enum.environments';
import { errorEnum } from '@enums/enum.errors';

const getAPIClient = (ctx?: any): AxiosInstance => {
  const cookies = parseCookies(ctx);
  const token = cookies[`${TOKEN_PREFIX}`];
  const apiConfig = axios.create({ baseURL: '/api' });

  apiConfig.interceptors.request.use((config: AxiosRequestConfig) => {
    if (token && config.headers) config.headers['Authorization'] = token;
    // if (config.headers) config.headers['Authorization'] = returnEnv(EnvEnum.TOKEN_TEMP);
    return config;
  });

  apiConfig.interceptors.response.use(
    (config: AxiosResponse) => {
      return config;
    },
    (error: APIError) => {
      const { response } = error;
      if (response.data.statusCode === 401) {
        // Destroy token
        destroyCookie(ctx, `${TOKEN_PREFIX}`);
        AlertNotification({ type: 'error', message: errorEnum.TOKEN_EXPIRED });
      } else {
        return Promise.reject(error);
      }
    },
  );
  return apiConfig;
};

export const api = getAPIClient();
