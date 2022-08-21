import { Element } from '@pages/api/models/element';

export type ElementContextProps = {
  element: Element | null;
  findElementByCode: (code: string) => Promise<void>;
};

export type ReturnSingleElement = {
  status: number;
  response: Element | boolean;
};

export type ReturnMultipleElements = {
  status: number;
  response: Element[] | boolean;
};
