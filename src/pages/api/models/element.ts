import { ObjectId } from 'mongodb';

import { connection } from '@pages/api/config/mongoConnection';
import { Authorized } from '@pages/api/models/authorized';
import { Document } from '@pages/api/models/documents';

import { Request } from 'express';

import { collecionsEnum } from '@enums/enum.colections';
import { errorEnum } from '@enums/enum.errors';

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

  updateIdUser = (idUser: ObjectId) => {
    this._idUser = idUser;
  };

  getAllItems = async (): Promise<Element[]> => {
    const db = await connection();
    const { list }: { list: Element[] } = await db
      .collection(collecionsEnum.ELEMENTS)
      .findOne({ _id: this._idUser });
    return list || [];
  };

  addNewElement = async (req: Request): Promise<Element[]> => {
    const db = await connection();
    const elements = await this.getAllItems();
    const exist = elements.some((element) => element.code === this.code);
    if (exist) {
      req.body.status = 400;
      throw new Error(errorEnum.CODE_EXISTS);
    }

    const insertItem = async () => {
      this.updateIdUser(new ObjectId());
      await db.collection(collecionsEnum.ELEMENTS).updateOne(
        { _id: this._idUser },
        {
          $push: { list: this },
        },
        { upsert: true },
      );
    };
    await insertItem();
    return [...elements, this];
  };
}
