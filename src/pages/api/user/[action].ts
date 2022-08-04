import { NextApiRequest, NextApiResponse } from 'next';

import { ControllerUser } from '@pages/api/controller/user';
import { Validations } from '@pages/api/middlewares/validations';

import { ResponseThrow } from '@@types/response';

import { routesEnum } from '@enums/enum.routes';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const meddlewares = new Validations();
  const userController = new ControllerUser();
  const { method, query } = req;

  if (method === 'POST') {
    if (query.action === routesEnum.CREATE_USER) {
      try {
        meddlewares.tokenValidator(req);
        await meddlewares.userValidator(req);
        await userController.createUser(req, res);
      } catch (error) {
        const { message } = error as ResponseThrow;
        return res.status(400).json({ message });
      }
    }
    if (query.action === routesEnum.SIGN_IN) {
      try {
        await meddlewares.signInValidator(req);
        await userController.signIn(req, res);
      } catch (error) {
        const { message } = error as ResponseThrow;
        return res.status(400).json({ message });
      }
    }
  }
  if (method === 'GET') {
    if (query.action === routesEnum.ME) {
      try {
        meddlewares.tokenValidator(req);
        await userController.me(req, res);
      } catch (error) {
        const { message } = error as ResponseThrow;
        return res.status(400).json({ message });
      }
    }
  }
}
