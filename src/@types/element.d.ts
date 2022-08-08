import { Element } from '@pages/api/models/element';

export type ElementContextProps = {
  element: Element | null;
  findElementByCode: (code: string) => Promise<void>;
};
