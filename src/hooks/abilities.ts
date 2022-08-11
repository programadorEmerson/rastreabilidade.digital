import { useCallback, useEffect, useState } from 'react';

import { useAuthContext } from '@hooks';

import { AbilitiesProps, CaslAbilitiesProps } from '@@types/abilities';

import { Ability } from '@casl/ability';

export const useCaslAbilities = (): CaslAbilitiesProps => {
  const [abilities, setAbilities] = useState(new Ability());

  const { user } = useAuthContext();

  const updateAbilities = useCallback((rules: AbilitiesProps) => {
    const abilitie = new Ability(rules);
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

  return { abilities, updateAbilities };
};
