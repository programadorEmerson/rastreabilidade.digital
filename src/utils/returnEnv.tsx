import { EnvEnum } from '@enums/enum.environments';

export const returnEnv = (env: EnvEnum): string => {
  switch (env) {
    case EnvEnum.DEVELOPMENT:
      return String(process.env.NEXT_PUBLIC_ENVIRONMENT);
    case EnvEnum.TOKEN_PREFIX:
      return String(process.env.NEXT_PUBLIC_TOKEN_PREFIX);
    case EnvEnum.DB_NAME:
      return String(process.env.NEXT_PUBLIC_DB_NAME);
    case EnvEnum.DB_URL:
      return String(process.env.NEXT_PUBLIC_DB_URL);
    case EnvEnum.SECRET_TOKEN:
      return String(process.env.NEXT_PUBLIC_SECRET_TOKEN);
    case EnvEnum.EXPIRATION_TOKEN:
      return String(process.env.NEXT_PUBLIC_EXPIRATION_TOKEN);
    case EnvEnum.TOKEN_TEMP:
      return String(process.env.NEXT_PUBLIC_TOKEN_TEST);
    case EnvEnum.SECRET_STRIPE:
      return String(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    case EnvEnum.PUBLIC_STRIPE:
      return String(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
    case EnvEnum.PRODUCTION_URL:
      return String(process.env.NEXT_PUBLIC_PRODUCTION_URL);
    default:
      throw new Error('Env not found');
  }
};
