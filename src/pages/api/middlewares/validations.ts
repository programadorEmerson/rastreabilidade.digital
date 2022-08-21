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

  codeParamsValidator = async (req: NextApiRequest) => {
    const { _idCollection, code = '' } = req.query;
    let modify_idCollection = _idCollection;
    for (let index = 0; index < 24; index++) {
      if (!modify_idCollection || modify_idCollection?.length < 24) {
        modify_idCollection += '0';
      } else if (modify_idCollection?.length > 24) {
        modify_idCollection = '000000000000000000000000';
      }
    }
    req.query = {
      ...req.query,
      _id: modify_idCollection,
      code: `RD-${String(code)
        .replaceAll('R', '')
        .replaceAll('D', '')
        .replaceAll('-', '')}`,
    };
  };
  codeFindParamsValidator = async (req: NextApiRequest) => {
    const { code = '' } = req.query;
    req.query = {
      ...req.query,
      code: `RD-${String(code)
        .replaceAll('R', '')
        .replaceAll('D', '')
        .replaceAll('-', '')}`,
    };
  };

  collectionIdParamsValidator = async (req: NextApiRequest) => {
    const { _idCollection, code = '' } = req.query;
    let modify_idCollection = _idCollection;
    for (let index = 0; index < 24; index++) {
      if (!modify_idCollection || modify_idCollection?.length < 24) {
        modify_idCollection += '0';
      } else if (modify_idCollection?.length > 24) {
        modify_idCollection = '000000000000000000000000';
      }
    }
    req.query = { ...req.query, _idCollection: modify_idCollection, code };
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

  idsParamsValidator = async (req: NextApiRequest) => {
    const { _idCollection, _idElement } = req.query;
    let modify_idCollection = _idCollection;
    let modify_idElement = _idElement;
    for (let index = 0; index < 24; index++) {
      if (!modify_idCollection || modify_idCollection?.length < 24) {
        modify_idCollection += '0';
      } else if (modify_idCollection?.length > 24) {
        modify_idCollection = '000000000000000000000000';
      }
    }
    for (let index = 0; index < 24; index++) {
      if (!modify_idElement || modify_idElement?.length < 24) {
        modify_idElement += '0';
      } else if (modify_idElement?.length > 24) {
        modify_idElement = '000000000000000000000000';
      }
    }
    req.query = {
      ...req.query,
      _idCollection: modify_idCollection,
      _idElement: modify_idElement,
    };
  };

  idParamsValidatorAndType = async (req: NextApiRequest) => {
    const { _idCollection, active } = req.query;
    let modify_idCollection = _idCollection;
    for (let index = 0; index < 24; index++) {
      if (!modify_idCollection || modify_idCollection?.length < 24) {
        modify_idCollection += '0';
      } else if (modify_idCollection?.length > 24) {
        modify_idCollection = '000000000000000000000000';
      }
    }
    req.query = {
      ...req.query,
      _idCollection: modify_idCollection,
      active,
    };
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
