import { NextApiRequest } from 'next';

import * as Yup from 'yup';

import { User } from '@pages/api/models/user';

import { ResponseYup } from '@@types/response';

import { errorEnum } from '@enums/enum.errors';

export class UserValidator {
  userValidator = async (req: NextApiRequest) => {
    try {
      const userSchema = Yup.object().shape({
        name: Yup.string()
          .min(3, errorEnum.NAME_MIN_LENGTH)
          .required(errorEnum.NAME_IS_REQUIRED),
        email: Yup.string()
          .email(errorEnum.VALID_EMAIL_REQUIRED)
          .max(60, errorEnum.EMAIL_MAX_LENGTH)
          .required(errorEnum.EMAIL_CANNOT_EMPTY),
        password: Yup.string()
          .min(8, errorEnum.PASSWORD_AT_LEASTED_8_CHARACTERS)
          .matches(
            /^(?=.*\d)(?=.*[A-Z])(?=.*[@$!%*?&])[0-9a-zA-Z@$!%*?&]{8,}$/,
            errorEnum.PASSWORD_MUST_CONTAIN_AT_LEAST_ONE_NUMBER,
          )
          .required(errorEnum.PASSWORD_CANNOT_EMPTY),
      });
      await userSchema.validate(req.body as User);
    } catch (err) {
      const { error } = err as ResponseYup;
      throw new Error(error);
    }
  };

  signInValidator = async (req: NextApiRequest) => {
    try {
      const userSchema = Yup.object().shape({
        email: Yup.string()
          .email(errorEnum.VALID_EMAIL_REQUIRED)
          .required(errorEnum.EMAIL_CANNOT_EMPTY),
        password: Yup.string().required(errorEnum.PASSWORD_CANNOT_EMPTY),
      });
      await userSchema.validate(req.body as User);
    } catch (err) {
      const errC = err as ResponseYup;
      throw new Error(errC.error);
    }
  };
}
