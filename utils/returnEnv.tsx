import { EnvEnum } from '@/enums/environment.enum';

export const returnEnv = (env: EnvEnum): string => {
  switch (env) {
    case EnvEnum.DEVELOPMENT:
      return String(process.env.NEXT_PUBLIC_ENVIRONMENT);
    case EnvEnum.TOKEN_PREFIX:
      return String(process.env.NEXT_PUBLIC_TOKEN_PREFIX);
    case EnvEnum.API_URL:
      return String(process.env.NEXT_PUBLIC_API_URL);
    default:
      throw new Error('Env not found');
  }
};
