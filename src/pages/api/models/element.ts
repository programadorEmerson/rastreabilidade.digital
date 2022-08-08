import { ObjectId } from 'mongodb';

import { connection } from '@pages/api/config/mongoConnection';
import { Authorized } from '@pages/api/models/authorized';
import { Document } from '@pages/api/models/documents';

import { collecionsEnum } from '@enums/enum.colections';
import { errorEnum } from '@enums/enum.errors';

type keysElements =
  | '_idElement'
  | '_idUser'
  | 'cretedAt'
  | 'updatedAt'
  | 'deletedAt'
  | 'active'
  | 'authorized'
  | 'documents'
  | 'code';

export class Element {
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
    if (element) {
      this.populateClass(element);
    }
  }

  private populateClass = (element: any): void => {
    const keysUser = Object.keys(element) as (keyof Element)[];
    keysUser.forEach((key) => {
      if (typeof this[key] !== 'function') {
        keysUser.forEach((key) => {
          if (key === '_idElement') {
            this._idElement = new ObjectId(element._idElement);
          }
          if (key === '_idUser') {
            this._idUser = new ObjectId(element._idUser);
          }
          if (key === 'cretedAt') {
            this.cretedAt = new Date(element.cretedAt).toISOString();
          }
          if (key === 'updatedAt') {
            this.updatedAt = new Date(element.updatedAt).toISOString();
          }
          if (key === 'deletedAt') {
            if (element.deletedAt) {
              this.deletedAt = new Date(element.deletedAt).toISOString();
            } else {
              this.deletedAt = null;
            }
          }
          if (key === 'active') {
            this.active = element.active;
          }
          if (key === 'authorized') {
            this.authorized = element.authorized.map(
              (authorized: Authorized) => {
                return new Authorized(authorized);
              },
            );
          }
          if (key === 'documents') {
            this.documents = element.documents.map((document: Document) => {
              return new Document(document);
            });
          }
          if (key === 'code') {
            this.code = element.code;
          }
        });
      }
    });
  };

  getThisElement = (): Element => {
    const keysProduct = Object.keys(this);
    let user = {};
    keysProduct.forEach((key) => {
      const crrKey = key as keysElements;
      if (typeof this[crrKey] !== 'function') {
        user = { ...user, [key]: this[crrKey] };
      }
    });
    return user as Element;
  };

  getAllItems = async (_id: ObjectId): Promise<Element[]> => {
    const db = await connection();
    const list = await db.collection(collecionsEnum.ELEMENTS).findOne({ _id });
    return list?.list || [];
  };

  getElementById = async (
    _id: ObjectId,
    idToken: ObjectId,
  ): Promise<Element> => {
    try {
      const db = await connection();
      const dataResponse = await db.collection(collecionsEnum.ELEMENTS).findOne(
        { _id: idToken },
        {
          projection: {
            list: {
              $elemMatch: {
                _idElement: _id,
              },
            },
          },
        },
      );
      let itemFound = {};
      if (dataResponse?.list) {
        itemFound = dataResponse.list[0];
      } else {
        throw new Error(errorEnum.ELEMENT_NOT_FOUND);
      }
      return itemFound as Element;
    } catch (error) {
      throw new Error(errorEnum.ELEMENT_NOT_FOUND);
    }
  };

  getElementByCode = async (
    code: string,
    idToken: ObjectId,
  ): Promise<Element> => {
    try {
      const db = await connection();
      const dataResponse = await db.collection(collecionsEnum.ELEMENTS).findOne(
        { _id: idToken },
        {
          projection: {
            list: {
              $elemMatch: {
                code,
              },
            },
          },
        },
      );
      let itemFound = {};
      if (dataResponse?.list) {
        itemFound = dataResponse.list[0];
      } else {
        throw new Error(errorEnum.ELEMENT_NOT_FOUND);
      }
      return itemFound as Element;
    } catch (error) {
      throw new Error(errorEnum.ELEMENT_NOT_FOUND);
    }
  };

  addNewElement = async (): Promise<Element> => {
    const db = await connection();
    const elements = await this.getAllItems(this._idUser);
    const exist = elements.some((element) => element.code === this.code);
    if (exist) throw new Error(errorEnum.CODE_EXISTS);
    const insertItem = async () => {
      await db.collection(collecionsEnum.ELEMENTS).updateOne(
        { _id: this._idUser },
        {
          $push: { list: this },
        },
        { upsert: true },
      );
    };
    await insertItem();
    return this;
  };
}
