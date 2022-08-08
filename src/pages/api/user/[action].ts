import { NextApiRequest, NextApiResponse } from 'next';

import { ControllerUser } from '@pages/api/controller/user';
import { UserValidator } from '@pages/api/middlewares/user.validator';

import { ResponseThrow } from '@@types/response';

import { routesEnum } from '@enums/enum.routes';

import { Validations } from '../middlewares/validations';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const user = new UserValidator();
  const auth = new Validations();
  const userController = new ControllerUser();
  const { method, query } = req;

  if (method === 'POST') {
    if (query.action === routesEnum.CREATE_USER) {
      try {
        auth.tokenValidator(req);
        await user.userValidator(req);
        await userController.createUser(req, res);
      } catch (error) {
        const { message } = error as ResponseThrow;
        return res.status(400).json({ message });
      }
    }
    if (query.action === routesEnum.SIGN_IN) {
      try {
        await user.signInValidator(req);
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
        auth.tokenValidator(req);
        await userController.me(req, res);
      } catch (error) {
        const { message } = error as ResponseThrow;
        return res.status(400).json({ message });
      }
    }
  }
  if (query.action === routesEnum.CHECK_EMAIL) {
    try {
      await auth.emailParamValidator(req);

      await userController.checkEmail(req, res);
    } catch (error) {
      const { message } = error as ResponseThrow;
      return res.status(400).json({ message });
    }
  }
}
