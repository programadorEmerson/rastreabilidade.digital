import React, { useState, createContext, useEffect } from 'react';

import jwtDecode from 'jwt-decode';

import { api } from '@services/api';

import { User } from '@pages/api/models/user';

import { AuthContextProps } from '@@types/auth';
import { ResponseAuthProps } from '@@types/response';

import { TOKEN_PREFIX } from '@utils/tokensPrefix';

import { destroyCookie, parseCookies, setCookie } from 'nookies';

import { routesEnum } from '@enums/enum.routes';

export type UserProps = {
  email: string;
  password: string;
};

const AuthContext = createContext({} as AuthContextProps);

type AuthProviderProps = {
  children: React.ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function newCookie(token: string) {
    setCookie(undefined, TOKEN_PREFIX, token, {
      maxAge: 60 * 60 * 24,
      path: routesEnum.INITIAL_ROUTE,
    }); // 1 day
  }

  async function handleSignIn(user: UserProps): Promise<void> {
    const {
      data: { response: token },
    } = await api.post<ResponseAuthProps>(`user/${routesEnum.SIGN_IN}`, user);
    const {
      data: { response: meUserToken },
    } = await api.get<ResponseAuthProps>(`user/${routesEnum.ME}`, {
      headers: { Authorization: token },
    });
    newCookie(token);
    setUser(jwtDecode(meUserToken) as User);
  }

  function handleSignOut() {
    destroyCookie(undefined, TOKEN_PREFIX);
    setUser(null);
  }

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
          setUser(jwtDecode(meUserToken) as User);
        } catch (error) {
          destroyCookie(undefined, TOKEN_PREFIX);
        } finally {
          setIsLoading(false);
        }
      }
    }
    getUserToken();
  }, []);

  const shared = {
    user,
    isLoading,
    handleSignIn,
    handleSignOut,
  };

  return <AuthContext.Provider value={shared}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
