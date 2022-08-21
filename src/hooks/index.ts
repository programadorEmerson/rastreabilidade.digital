import { useContext, useCallback, useEffect, useState } from 'react';

import { useMediaQuery, useTheme } from '@mui/material';

import _ from 'lodash';

import { AbilityContext } from '@context/ability.context';
import { AuthContext } from '@context/auth.context';
import { ElementContext } from '@context/element.context';

import { AbilitiesProps, CaslAbilitiesProps } from '@@types/abilities';
import { AuthContextProps } from '@@types/auth';
import { ElementContextProps } from '@@types/element';

import { Ability, AnyAbility } from '@casl/ability';
import { ConstantsEnum } from '@enums/enum.constants';
import { FeatureCodeEnum } from '@enums/enum.feature.code';

export const useAuthContext = (): AuthContextProps => {
  return useContext(AuthContext);
};

export const useElementContext = (): ElementContextProps => {
  return useContext(ElementContext);
};

export const useAbilitiesContext = (): AnyAbility => {
  return useContext(AbilityContext);
};

export const useCaslAbilities = (): CaslAbilitiesProps => {
  const [abilities, setAbilities] = useState(new Ability());
  const [featuresArray, setFeaturesArray] = useState<string[]>([]);

  const { user } = useAuthContext();

  const updateAbilities = useCallback((rules: AbilitiesProps) => {
    const abilitie = new Ability(rules);
    setFeaturesArray(
      _.chain(rules)
        .groupBy('subject')
        .map((_, value) => value as FeatureCodeEnum)
        .value(),
    );
    setAbilities(abilitie);
  }, []);

  useEffect(() => {
    const refreshAbilitiesState = () => {
      if (user) {
        return updateAbilities(user.rules);
      }
      return new Ability();
    };
    refreshAbilitiesState();
  }, [updateAbilities, user]);

  return { abilities, updateAbilities, featuresArray };
};

export function useDeviceType(): { type: string } {
  const isMobile = !useMediaQuery(useTheme().breakpoints.up('sm'));
  return { type: isMobile ? ConstantsEnum.MOBILE : ConstantsEnum.OTHERS };
}
