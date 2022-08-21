import { ObjectId } from 'mongodb';

import { Authorized } from '@pages/api/models/authorized';
import { Document } from '@pages/api/models/documents';

import { GenericCollectionElementType } from '@@types/generic';

import { GenericMongoDb } from './genericMongoDb';
export class Element extends GenericMongoDb {
  _idElement: ObjectId = new ObjectId();
  _idUser: ObjectId = new ObjectId();
  cretedAt: string = new Date().toISOString();
  updatedAt: string = new Date().toISOString();
  deletedAt: string | null = null;
  active = true;
  authorized: Authorized[] = [];
  documents: Document[] = [];
  code = '';

  constructor(element?: Element) {
    super();
    if (element) {
      const keysUser = Object.keys(element) as (keyof Element)[];
      keysUser.forEach((key) => {
        if (typeof this[key] !== 'function') {
          if (key === '_idElement' || key === '_idUser') {
            Object.assign(this, { [key]: new ObjectId(element[key]) });
          } else if (key === 'code') {
            Object.assign(this, {
              [key]: `RD-${element[key]
                .toUpperCase()
                .replaceAll('R', '')
                .replaceAll('D', '')
                .replaceAll('-', '')}`,
            });
          } else {
            Object.assign(this, { [key]: element[key] });
          }
        }
      });
    }
  }

  getElement = (): Element => {
    const keysElement = Object.keys(this) as (keyof Element)[];
    const element = {} as Element;
    keysElement.forEach((key) => {
      if (typeof this[key] !== 'function') {
        if (key === '_idElement' || key === '_idUser') {
          Object.assign(element, { [key]: new ObjectId(this[key]) });
        } else {
          Object.assign(element, { [key]: this[key] });
        }
      }
    });
    return element;
  };

  getElementById = async (
    props: GenericCollectionElementType,
  ): Promise<Element | boolean> => {
    return await this.getElementInArrayById<Element>({
      _idCollection: new ObjectId(props._idCollection),
      _idElement: new ObjectId(props._idElement),
      collection: props.collection,
    });
  };

  addNewElement = async (
    props: GenericCollectionElementType,
  ): Promise<Element | boolean> => {
    return await this.addNewElementInList<Element>({
      _idCollection: new ObjectId(props._idCollection),
      element: this.getElement(),
      collection: props.collection,
    });
  };

  getElementByCode = async (props: GenericCollectionElementType) => {
    const element = new Element();
    return await element.getElementByKeyInList<Element>({
      code: props.code,
      _idCollection: new ObjectId(props._idCollection),
      collection: props.collection,
    });
  };
}
