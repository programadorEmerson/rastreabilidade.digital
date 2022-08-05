import { NextApiRequest } from 'next';

import * as Yup from 'yup';

import { Element } from '@pages/api/models/element';

import { ResponseYup } from '@@types/response';

import { errorEnum } from '@enums/enum.errors';

export class ElementValidator {
  elementValidator = async (req: NextApiRequest) => {
    try {
      const userSchema = Yup.object().shape({
        code: Yup.string().required(errorEnum.CODE_NOT_EMPTY),
      });
      await userSchema.validate(req.body as Element);
    } catch (err) {
      const { error } = err as ResponseYup;
      throw new Error(error);
    }
  };
}
