import { EnvironmentEnum } from '../enums/environment.enum';
import { returnEnv } from './returnEnv';

export const TOKEN_SUFIX = returnEnv(EnvironmentEnum.DEVELOPMENT) ? '-dev' : '';

export const TOKEN_PREFIX = `programando-solucoes${TOKEN_SUFIX}`;

export const COOKIE_CONSENT = `${TOKEN_PREFIX}-cookie-consent`;
