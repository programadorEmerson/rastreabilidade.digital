import React, { useState, createContext, useEffect, useCallback } from 'react';

import { useRouter } from 'next/router';

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

export type Permission = { action: string; subject: string };

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { reload } = useRouter();

  const getFullUserData = useCallback(async (token: string) => {
    const {
      data: { response: meUserToken },
    } = await api.get<ResponseAuthProps>(`user/${routesEnum.ME}`, {
      headers: { Authorization: token },
    });
    const currentUser = jwtDecode(meUserToken) as User;
    setUser(currentUser);
    setCookie(undefined, TOKEN_PREFIX, token, {
      maxAge: 60 * 60 * 24,
      path: routesEnum.INITIAL_ROUTE,
    });
  }, []);

  async function handleSignIn(user: UserProps): Promise<void> {
    const { data } = await api.post<ResponseAuthProps>(
      `user/${routesEnum.SIGN_IN}`,
      user,
    );
    await getFullUserData(data.response);
  }

  function handleSignOut() {
    destroyCookie(undefined, TOKEN_PREFIX);
    reload();
  }

  const setTokenUser = useCallback(
    async (token: string) => {
      try {
        setIsLoading(true);
        await getFullUserData(token);
      } catch (error) {
        setUser(null);
        destroyCookie(undefined, TOKEN_PREFIX);
      } finally {
        setIsLoading(false);
      }
    },
    [getFullUserData],
  );

  useEffect(() => {
    async function getUserToken() {
      const cookies = parseCookies();
      const token = cookies[`${TOKEN_PREFIX}`];
      if (token) {
        setIsLoading(true);
        try {
          await getFullUserData(token);
        } catch (error) {
          destroyCookie(undefined, TOKEN_PREFIX);
        } finally {
          setIsLoading(false);
        }
      }
    }
    getUserToken();
  }, [getFullUserData]);

  const shared = {
    user,
    isLoading,
    setTokenUser,
    handleSignIn,
    handleSignOut,
  };

  return <AuthContext.Provider value={shared}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
