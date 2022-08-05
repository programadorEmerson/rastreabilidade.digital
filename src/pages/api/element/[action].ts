import { NextApiRequest, NextApiResponse } from 'next';

import { ControllerElement } from '@pages/api/controller/element';
import { ElementValidator } from '@pages/api/middlewares/element.validator';
import { Validations } from '@pages/api/middlewares/validations';

import { ResponseThrow } from '@@types/response';

import { routesEnum } from '@enums/enum.routes';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, query } = req;
  const validator = new ElementValidator();
  const auth = new Validations();
  const element = new ControllerElement();

  if (method === 'POST') {
    if (query.action === routesEnum.CREATE_ELEMENT) {
      try {
        auth.tokenValidator(req);
        validator.elementValidator(req);
        await element.createElement(req, res);
      } catch (error) {
        const { message } = error as ResponseThrow;
        return res.status(400).json({ error: message });
      }
    }
  }
  if (method === 'GET') {
    if (query.action === routesEnum.GET_ALL_ELEMENTS) {
      try {
        auth.tokenValidator(req);
        await element.getAllElements(req, res);
      } catch (error) {
        const { message } = error as ResponseThrow;
        return res.status(400).json({ error: message });
      }
    }
    if (query.action === routesEnum.GET_ELEMENT_BY_ID) {
      try {
        auth.tokenValidator(req);
        auth.idParamsValidator(req);
        await element.getElementById(req, res);
      } catch (error) {
        const { message } = error as ResponseThrow;
        return res.status(400).json({ error: message });
      }
    }
  }
}
