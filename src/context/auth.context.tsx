import React, { useState, createContext, useEffect, useCallback } from 'react';

import { useRouter } from 'next/router';

import jwtDecode from 'jwt-decode';

import _ from 'lodash';

import { api } from '@services/api';

import { Rule } from '@pages/api/models/rules';
import { User } from '@pages/api/models/user';

import { AuthContextProps } from '@@types/auth';
import { ResponseAuthProps } from '@@types/response';

import { TOKEN_PREFIX } from '@utils/tokensPrefix';

import { destroyCookie, parseCookies, setCookie } from 'nookies';

import { FeatureCodeEnum } from '@enums/enum.feature.code';
import { routesEnum } from '@enums/enum.routes';

export type UserProps = {
  email: string;
  password: string;
};

const AuthContext = createContext({} as AuthContextProps);

type AuthProviderProps = {
  children: React.ReactNode;
};

export type Permission = { action: string; subject: string };

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [featuresArray, setFeaturesArray] = useState<string[]>([]);
  const { push } = useRouter();

  function groupAllFeaturesCode(features: Rule[]) {
    setFeaturesArray(
      _.chain(features)
        .groupBy('subject')
        .map((_, value) => value as FeatureCodeEnum)
        .value(),
    );
  }

  function newCookie(token: string) {
    setCookie(undefined, TOKEN_PREFIX, token, {
      maxAge: 60 * 60 * 24,
      path: routesEnum.INITIAL_ROUTE,
    }); // 1 day
  }

  async function handleSignIn(user: UserProps): Promise<string> {
    const {
      data: { response: token },
    } = await api.post<ResponseAuthProps>(`user/${routesEnum.SIGN_IN}`, user);
    const {
      data: { response: meUserToken },
    } = await api.get<ResponseAuthProps>(`user/${routesEnum.ME}`, {
      headers: { Authorization: token },
    });
    const currentUser = jwtDecode(meUserToken) as User;
    setUser(currentUser);
    newCookie(token);
    return token;
  }

  function handleSignOut() {
    destroyCookie(undefined, TOKEN_PREFIX);
    setUser(null);
    push(routesEnum.INITIAL_ROUTE);
  }

  const setTokenUser = useCallback(async (token: string) => {
    try {
      setIsLoading(true);
      const {
        data: { response: meUserToken },
      } = await api.get<ResponseAuthProps>(`user/${routesEnum.ME}`, {
        headers: { Authorization: token },
      });
      const currentUser = jwtDecode(meUserToken) as User;
      setUser(currentUser);
    } catch (error) {
      setUser(null);
      destroyCookie(undefined, TOKEN_PREFIX);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    async function getUserToken() {
      const cookies = parseCookies();
      const token = cookies[`${TOKEN_PREFIX}`];
      if (token) {
        setIsLoading(true);
        try {
          const {
            data: { response: meUserToken },
          } = await api.get<ResponseAuthProps>(`user/${routesEnum.ME}`);
          const currentUser = jwtDecode(meUserToken) as User;
          setUser(currentUser);
        } catch (error) {
          destroyCookie(undefined, TOKEN_PREFIX);
        } finally {
          setIsLoading(false);
        }
      }
    }
    getUserToken();
  }, []);

  useEffect(() => {
    if (user?.rules) return groupAllFeaturesCode(user.rules);
    setFeaturesArray([]);
  }, [user]);

  const shared = {
    user,
    isLoading,
    featuresArray,
    setTokenUser,
    handleSignIn,
    handleSignOut,
  };

  return <AuthContext.Provider value={shared}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
