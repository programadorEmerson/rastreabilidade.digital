import React, { createContext, FC } from 'react';

import { useCaslAbilities } from '@hooks/abilities';

import { AnyAbility } from '@casl/ability';
import { createContextualCan } from '@casl/react';

const AbilityContext = createContext<AnyAbility>({} as AnyAbility);
const Can = createContextualCan(AbilityContext.Consumer);

type AbilityProviderProps = {
  children: React.ReactNode;
};

const AbilityProvider: FC<AbilityProviderProps> = ({ children }) => {
  const { abilities } = useCaslAbilities();

  return (
    <AbilityContext.Provider value={abilities}>
      {children}
    </AbilityContext.Provider>
  );
};

export { AbilityContext, Can, AbilityProvider };
