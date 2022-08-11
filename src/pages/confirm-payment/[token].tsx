import { useEffect } from 'react';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import jwtDecode from 'jwt-decode';

import { api } from '@services/api';

import { useAuthContext } from '@hooks';

import { RegisterType } from '@@types/register';
import { ResponseAuthProps } from '@@types/response';

import { TOKEN_PREFIX, TOKEN_REGISTER_PREFIX } from '@utils/tokensPrefix';

import { destroyCookie, setCookie } from 'nookies';

import { routesEnum } from '@enums/enum.routes';

const ConfirmPayment: NextPage = () => {
  const { query, push } = useRouter();
  const { handleSignIn } = useAuthContext();

  useEffect(() => {
    async function getUserToken() {
      const { token } = query;
      if (token) {
        try {
          const userToken = jwtDecode(String(token)) as RegisterType;
          await api.post(`user/${routesEnum.CREATE_USER}`, userToken);
          const {
            data: { response: tokenSignin },
          } = await api.post<ResponseAuthProps>(
            `user/${routesEnum.SIGN_IN}`,
            userToken,
          );
          setCookie(undefined, TOKEN_PREFIX, tokenSignin, {
            maxAge: 60 * 60 * 24,
            path: routesEnum.INITIAL_ROUTE,
          });
          destroyCookie(undefined, TOKEN_REGISTER_PREFIX, {
            path: routesEnum.INITIAL_ROUTE,
          });
          push(routesEnum.INITIAL_ROUTE);
        } catch (error) {
          push(`/${routesEnum.SIGN_IN}`);
        }
      }
    }
    getUserToken();
  }, [handleSignIn, push, query]);

  return <div />;
};

export default ConfirmPayment;
