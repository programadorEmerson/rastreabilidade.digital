import { EnvironmentEnum } from '../enums/environment.enum';

export const returnEnv = (env: EnvironmentEnum): string => {
  switch (env) {
    case EnvironmentEnum.DEVELOPMENT:
      return String(process.env.NEXT_PUBLIC_ENVIRONMENT);
    default:
      return String(process.env.NEXT_PUBLIC_API_URL);
  }
};
