import { NextApiRequest } from 'next';

import { ObjectId } from 'mongodb';

import { TypeFindWithId } from '@@types/response';

import { Element } from '../models/element';

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
    console.log(_id);
    return {
      status: 200,
      response: await element.getElementById(
        new ObjectId(_id),
        new ObjectId(idToken),
      ),
    };
  };
}
