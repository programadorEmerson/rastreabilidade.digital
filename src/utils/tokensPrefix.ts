import { returnEnv } from '@/utils/returnEnv';

import { EnvEnum } from '@/enums/enum.environments';

export const TOKEN_SUFIX = returnEnv(EnvEnum.DEVELOPMENT) ? '-dev' : '';

export const TOKEN_PREFIX = `${returnEnv(EnvEnum.TOKEN_PREFIX)}${TOKEN_SUFIX}`;

export const COOKIE_CONSENT = `${TOKEN_PREFIX}-cookie-consent`;
