import React, { useState, createContext } from 'react';

import { AuthContextProps } from '@/types/auth';

export type UserProps = {
  username: string;
  email: string;
};

const AuthContext = createContext({} as AuthContextProps);

type AuthProviderProps = {
  children: React.ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);

  function handleSignIn(user: UserProps) {
    setUser(user);
  }

  const shared = {
    user,
    handleSignIn,
  };

  return <AuthContext.Provider value={shared}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
