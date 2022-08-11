import { useContext } from 'react';

import { AbilityContext } from '@context/ability.context';
import { AuthContext } from '@context/auth.context';
import { ElementContext } from '@context/element.context';

import { AuthContextProps } from '@@types/auth';
import { ElementContextProps } from '@@types/element';

import { AnyAbility } from '@casl/ability';

export const useAuthContext = (): AuthContextProps => {
  return useContext(AuthContext);
};

export const useElementContext = (): ElementContextProps => {
  return useContext(ElementContext);
};

export const useAbilitiesContext = (): AnyAbility => {
  return useContext(AbilityContext);
};
