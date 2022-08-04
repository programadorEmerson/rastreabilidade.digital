import { routesEnum } from '@enums/enum.routes';

export const ssrRedirectLogin = {
  redirect: {
    destination: routesEnum.SIGN_IN,
    permanent: false,
  },
};

export const ssrRedirectDashboard = {
  redirect: {
    destination: routesEnum.SIGN_IN,
    permanent: false,
  },
};

export const ssrDefaultReturn = {
  props: {},
};
