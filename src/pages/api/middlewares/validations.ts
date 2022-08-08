import { NextApiRequest } from 'next';

import jwtDecode from 'jwt-decode';

import * as Yup from 'yup';

import { User } from '@pages/api/models/user';

import { ResponseYup } from '@@types/response';

import { returnEnv } from '@utils/returnEnv';

import jwt from 'jsonwebtoken';

import { EnvEnum } from '@enums/enum.environments';
import { errorEnum } from '@enums/enum.errors';

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

  idParamsValidator = async (req: NextApiRequest) => {
    const { _id } = req.query;
    let modify_id = _id;
    for (let index = 0; index < 24; index++) {
      if (!modify_id || modify_id?.length < 24) {
        modify_id += '0';
      } else if (modify_id?.length > 24) {
        modify_id = '000000000000000000000000';
      }
    }
    req.query = { ...req.query, _id: modify_id };
  };

  emailParamValidator = async (req: NextApiRequest) => {
    try {
      const userSchema = Yup.object().shape({
        email: Yup.string()
          .email(errorEnum.VALID_EMAIL_REQUIRED)
          .max(60, errorEnum.EMAIL_MAX_LENGTH)
          .required(errorEnum.EMAIL_CANNOT_EMPTY),
      });
      await userSchema.validate(req.query);
    } catch (err) {
      const { message } = err as ResponseYup;
      throw new Error(message);
    }
  };
}
