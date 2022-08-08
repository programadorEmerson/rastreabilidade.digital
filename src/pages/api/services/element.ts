import { NextApiRequest } from 'next';

import { ObjectId } from 'mongodb';

import { Element } from '@pages/api/models/element';

import { TypeFindWithCode, TypeFindWithId } from '@@types/response';

export class ServiceElement {
  createNewElement = async (req: NextApiRequest) => {
    const element = new Element({ ...req.body, _idUser: req.query.idToken });
    return { status: 200, response: await element.addNewElement() };
  };

  getAllElements = async (req: NextApiRequest) => {
    const element = new Element();
    const idRequest = new ObjectId(String(req.query.idToken || ''));
    return { status: 200, response: await element.getAllItems(idRequest) };
  };

  getElementById = async (req: NextApiRequest) => {
    const element = new Element();
    const { _id, idToken } = req.query as TypeFindWithId;
    return {
      status: 200,
      response: await element.getElementById(
        new ObjectId(_id),
        new ObjectId(idToken),
      ),
    };
  };
  getElementByCode = async (req: NextApiRequest) => {
    const element = new Element();
    const { code, idToken } = req.query as TypeFindWithCode;
    return {
      status: 200,
      response: await element.getElementByCode(code, new ObjectId(idToken)),
    };
  };
}
