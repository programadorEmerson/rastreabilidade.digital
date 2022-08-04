import { NextApiRequest } from 'next';

import jwtDecode from 'jwt-decode';

import * as Yup from 'yup';

import { ResponseYup } from '@/types/response';

import { returnEnv } from '@/utils/returnEnv';

import jwt from 'jsonwebtoken';

import { EnvEnum } from '@/enums/enum.environments';
import { errorEnum } from '@/enums/enum.errors';
import { User } from '@/pages/api/models/user';

export class Validations {
  decriptToken(token: string) {
    try {
      const user = jwtDecode(token);
      if (!user) throw new Error(errorEnum.TOKEN_EXPIRED);
      return user as User;
    } catch (error) {
      throw new Error(errorEnum.INVALID_TOKEN);
    }
  }

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
      await userSchema.validate(req.body);
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
      await userSchema.validate(req.body);
    } catch (err) {
      const errC = err as ResponseYup;
      throw new Error(errC.error);
    }
  };

  tokenValidator = (req: NextApiRequest) => {
    try {
      const token = req.headers.authorization as string;
      jwt.verify(token, returnEnv(EnvEnum.SECRET_TOKEN));
      const { _id } = jwtDecode(token) as User;
      req.query = { ...req.query, idToken: String(_id) };
    } catch (error) {
      throw new Error(errorEnum.INVALID_TOKEN);
    }
  };
}
