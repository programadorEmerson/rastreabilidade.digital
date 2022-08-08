import { useContext } from 'react';

import { AuthContext } from '@context/auth.context';
import { ElementContext } from '@context/element.context';

import { AuthContextProps } from '@@types/auth';
import { ElementContextProps } from '@@types/element';

export const useAuthContext = (): AuthContextProps => {
  return useContext(AuthContext);
};

export const useElementContext = (): ElementContextProps => {
  return useContext(ElementContext);
};
