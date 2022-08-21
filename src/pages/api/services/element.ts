import { NextApiRequest } from 'next';

import { ObjectId } from 'mongodb';

import { Element } from '@pages/api/models/element';

import { ReturnMultipleElements, ReturnSingleElement } from '@@types/element';
import {
  TypeFindWithCode,
  TypeFindWithId,
  TypeGetAllElements,
} from '@@types/response';

import { collecionsEnum } from '@enums/enum.colections';

export class ServiceElement {
  createNewElement = async (
    req: NextApiRequest,
  ): Promise<ReturnSingleElement> => {
    const { _idCollection } = req.query as TypeFindWithId;
    const element = new Element({ ...req.body });
    const response = await element.addNewElement({
      _idCollection: new ObjectId(_idCollection),
      collection: collecionsEnum.ELEMENTS,
      item: element,
    });
    return { status: 200, response };
  };

  getAllElements = async (
    req: NextApiRequest,
  ): Promise<ReturnMultipleElements> => {
    const element = new Element();
    const { _idCollection, active } = req.query as TypeGetAllElements;
    const response = await element.getAllItems<Element>({
      _idCollection: new ObjectId(_idCollection as string),
      active: active === 'true',
      collection: collecionsEnum.ELEMENTS,
    });
    return { status: 200, response };
  };

  getElementInCollectionById = async (
    req: NextApiRequest,
  ): Promise<ReturnSingleElement> => {
    const element = new Element();
    const { _idCollection, _idElement } = req.query as TypeFindWithId;
    const response = await element.getElementById({
      _idCollection: new ObjectId(_idCollection),
      _idElement: new ObjectId(_idElement),
      collection: collecionsEnum.ELEMENTS,
    });
    return { status: 200, response };
  };

  getElementByCode = async (
    req: NextApiRequest,
  ): Promise<ReturnSingleElement> => {
    const element = new Element();
    const { code, _idCollection } = req.query as TypeFindWithCode;
    const response = await element.getElementByKeyInList<Element>({
      code,
      _idCollection: new ObjectId(_idCollection),
      collection: collecionsEnum.ELEMENTS,
    });
    return { status: 200, response };
  };

  findElementByCode = async (
    req: NextApiRequest,
  ): Promise<ReturnSingleElement> => {
    const element = new Element();
    const { code } = req.query as TypeFindWithCode;
    const response = await element.findElementByCode<Element>({
      code,
      collection: collecionsEnum.ELEMENTS,
    });
    return { status: 200, response };
  };
}
