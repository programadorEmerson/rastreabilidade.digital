import React, { useState, createContext } from 'react';

import { api } from '@services/api';

import { useAuthContext } from '@hooks';

import { Element } from '@pages/api/models/element';

import { ElementContextProps } from '@@types/element';

import { routesEnum } from '@enums/enum.routes';

const ElementContext = createContext({} as ElementContextProps);

type ElementProviderProps = {
  children: React.ReactNode;
};

function ElementProvider({ children }: ElementProviderProps) {
  const [element, setElement] = useState<Element | null>(null);

  async function findElementByCode(code: string) {
    const {
      data: { response },
    } = await api.get<{ response: Element }>(
      `element/${routesEnum.FIND_ELEMENT_BY_CODE}?code=${code}`,
    );
    setElement(response);
  }

  const shared = {
    element,
    findElementByCode,
  };

  return (
    <ElementContext.Provider value={shared}>{children}</ElementContext.Provider>
  );
}

export { ElementContext, ElementProvider };
