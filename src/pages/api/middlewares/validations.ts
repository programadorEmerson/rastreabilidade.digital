import { NextApiRequest } from 'next';

import jwtDecode from 'jwt-decode';

import { User } from '@pages/api/models/user';

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

  isValidObjectID(_id: string) {
    _id = _id + '';
    const len = _id.length;
    let valid = false;
    if (len == 12 || len == 24) {
      valid = /^[0-9a-fA-F]+$/.test(_id);
    }
    return valid;
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
      } else {
        modify_id = '000000000000000000000000';
      }
    }
    req.query = { ...req.query, _id: modify_id };
  };
}
