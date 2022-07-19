import { RoutesPathsEnum } from '../enums/routes.paths.enum';

export const ssrRedirectLogin = {
  redirect: {
    destination: RoutesPathsEnum.SIG_IN,
    permanent: false,
  },
};

export const ssrRedirectDashboard = {
  redirect: {
    destination: RoutesPathsEnum.DASHBOARD,
    permanent: false,
  },
};

export const ssrDefaultReturn = {
  props: {},
};
