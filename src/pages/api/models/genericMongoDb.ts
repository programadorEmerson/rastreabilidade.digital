import { ObjectId } from 'mongodb';

import { connection } from '@pages/api/config/mongoConnection';

import {
  GenericCollectionElementType,
  GenericElementType,
  GenericType,
} from '@@types/generic';

import { returnEnv } from '@utils/returnEnv';

import jwt from 'jsonwebtoken';

import { ConstantsEnum } from '@enums/enum.constants';
import { EnvEnum } from '@enums/enum.environments';

export class GenericMongoDb {
  generateToken = <T>(element: T): string => {
    return jwt.sign({ ...element } as any, returnEnv(EnvEnum.SECRET_TOKEN), {
      expiresIn: returnEnv(EnvEnum.EXPIRATION_TOKEN),
    });
  };

  findById = async <T>(props: GenericType): Promise<T | boolean> => {
    const { key: id, collection } = props;
    const _id = new ObjectId(id);
    const db = await connection();
    const collectionDb = db.collection(collection);
    const response = (await collectionDb.findOne({ _id })) as T;

    if (!response) return false;
    return response;
  };

  findByKey = async <T>(props: GenericType): Promise<T | boolean> => {
    const excludeKeys = [ConstantsEnum.COLLECTION, ConstantsEnum.ERROR];
    const db = await connection();
    const collectionDb = db.collection(props.collection);
    const key = Object.keys(props).filter((crrKey) => {
      return !excludeKeys.includes(crrKey as ConstantsEnum);
    })[0];
    const response = (await collectionDb.findOne({ [key]: props[key] })) as T;

    if (!response) return false;
    return response;
  };

  createElement = async <T>(props: GenericType): Promise<T | boolean> => {
    const db = await connection();
    const { element, collection } = props;
    const collectionDb = db.collection(collection);
    const { insertedId: _id } = await collectionDb.insertOne(element);
    if (!_id) return false;
    return { _id, ...element } as T;
  };

  getElementInArrayById = async <T>(
    props: GenericElementType,
  ): Promise<T | boolean> => {
    const db = await connection();
    const { _idCollection, _idElement, collection } = props;
    const element = (await db.collection(collection).findOne(
      { _id: _idCollection },
      {
        projection: {
          list: {
            $elemMatch: {
              _idElement,
            },
          },
        },
      },
    )) as { list: T[] };
    if (!element || !element.list) return false;
    const [elementFound] = element.list;
    const elementReturn = (elementFound as unknown) as { active: boolean };

    if (!elementReturn.active) return false;
    return elementFound;
  };

  getAllItems = async <T>(
    props: GenericCollectionElementType,
  ): Promise<T[] | boolean> => {
    const db = await connection();
    const { _idCollection, active, collection } = props;
    const list = (await db
      .collection(collection)
      .findOne({ _id: _idCollection })) as { list: T[] };
    if (!list || !list.list) return false;

    const listReturn = list.list.filter((crr) => {
      const element = (crr as unknown) as { active: boolean };
      if (element.active === active) return element;
    });
    return listReturn ? listReturn : [];
  };

  findElementByCode = async <Element>(
    props: GenericType,
  ): Promise<Element | boolean> => {
    const db = await connection();
    const collectionDb = db.collection(props.collection);
    return ((await collectionDb.find({}).toArray()) as [{ list: Element[] }])
      .map((crr) => crr.list)
      .flat()
      .find((crr) => {
        const element = (crr as unknown) as { code: string };
        if (element.code === props.code) return element;
      }) as Element;
  };

  getElementByKeyInList = async <T>(
    props: GenericCollectionElementType,
  ): Promise<T | boolean> => {
    const db = await connection();
    const { _idCollection, collection } = props;
    const excludeKeys = ['_idCollection', 'collection'];
    const collectionDb = db.collection(collection);
    const key = Object.keys(props).filter((crrKey) => {
      return !excludeKeys.includes(crrKey as ConstantsEnum);
    })[0];

    const response = (await collectionDb.findOne(
      { _id: _idCollection },
      {
        projection: {
          list: {
            $elemMatch: {
              [key]: props[key],
            },
          },
        },
      },
    )) as { list: T[] };

    if (!response || !response.list) return false;

    const [element] = response.list;
    return element;
  };

  addNewElementInList = async <T>(
    props: GenericElementType,
  ): Promise<T | boolean> => {
    const db = await connection();
    const { _idCollection, collection, element } = props;
    const elements = await this.getAllItems<T>({
      _idCollection,
      collection,
      active: true,
    });

    if (!elements) {
      await db.collection(collection).updateOne(
        { _id: _idCollection },
        {
          $push: { list: element },
        },
        { upsert: true },
      );
      return element;
    }
    const listElement = elements as T[];
    const exist = listElement.some((crr) => {
      const crrElement = (crr as unknown) as { code: string };
      return element.code === crrElement.code;
    });

    if (exist) return false;
    const insertItem = async () => {
      await db.collection(collection).updateOne(
        { _id: _idCollection },
        {
          $push: { list: this },
        },
        { upsert: true },
      );
    };
    await insertItem();
    return element;
  };
}
