import { returnEnv } from '@utils/returnEnv';

import { EnvEnum } from '@enums/enum.environments';
import { routesEnum } from '@enums/enum.routes';

export const TOKEN_SUFIX = returnEnv(EnvEnum.DEVELOPMENT) ? '-dev' : '';

export const TOKEN_PREFIX = `${returnEnv(EnvEnum.TOKEN_PREFIX)}${TOKEN_SUFIX}`;

export const TOKEN_REGISTER_PREFIX = `new-user-${returnEnv(
  EnvEnum.TOKEN_PREFIX,
)}${TOKEN_SUFIX}`;

export const COOKIE_CONSENT = `${TOKEN_PREFIX}-cookie-consent`;

export const ssrRedirectLogin = {
  redirect: {
    destination: routesEnum.SIGN_IN,
    permanent: false,
  },
};

export const ssrRedirectDashboard = {
  redirect: {
    destination: routesEnum.INITIAL_ROUTE,
    permanent: false,
  },
};

export const ssrDefaultReturn = {
  props: {},
};
