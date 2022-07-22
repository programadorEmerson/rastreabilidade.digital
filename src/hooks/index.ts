import { useContext } from 'react';

import { AuthContext } from '@/context/auth.context';

import { AuthContextProps } from '@/types/authContext.types';

const useAuthContext = (): AuthContextProps => {
  return useContext(AuthContext);
};

export default useAuthContext;