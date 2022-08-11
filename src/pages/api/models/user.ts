/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextApiRequest } from 'next';

import { ObjectId } from 'mongodb';

import { connection } from '@pages/api/config/mongoConnection';
import { Rule } from '@pages/api/models/rules';

import { returnEnv } from '@utils/returnEnv';

import { compare, genSalt, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

import { collecionsEnum } from '@enums/enum.colections';
import { EnvEnum } from '@enums/enum.environments';
import { errorEnum } from '@enums/enum.errors';
import { FeatureCodeEnum } from '@enums/enum.feature.code';

const ruleAllAccess = [
  new Rule(({
    action: 'read',
    subject: FeatureCodeEnum.FC_ALL,
  } as unknown) as Rule),
  new Rule(({
    action: 'create',
    subject: FeatureCodeEnum.FC_ALL,
  } as unknown) as Rule),
  new Rule(({
    action: 'update',
    subject: FeatureCodeEnum.FC_ALL,
  } as unknown) as Rule),
  new Rule(({
    action: 'delete',
    subject: FeatureCodeEnum.FC_ALL,
  } as unknown) as Rule),
];

type keysUser =
  | '_id'
  | 'name'
  | 'email'
  | 'createdAt'
  | 'inactivatedIn'
  | 'active'
  | 'phone'
  | 'plan'
  | 'type'
  | 'typePhone'
  | 'dueDate'
  | 'password'
  | 'urlImage'
  | 'rules';

export class User {
  _id: ObjectId = new ObjectId();
  name = '';
  email = '';
  phone = '';
  dueDate = '';
  plan = '';
  type = '';
  typePhone = 'fix';
  createdAt = '';
  inactivatedIn: string | null = null;
  active = false;
  password = '';
  urlImage = '/img/no-image.png';
  rules: Rule[] = [];

  constructor(user?: any) {
    if (user) {
      this.populateClass(user);
    }
  }

  private populateClass = (user: any): void => {
    const keysUser = Object.keys(user);
    keysUser.forEach((key) => {
      const crrKey = key as keysUser;
      if (typeof this[crrKey] !== 'function') {
        keysUser.forEach((key) => {
          if (key === '_id') {
            this._id = new ObjectId(user._id);
          }
          if (key === 'insertedId') {
            this._id = new ObjectId(user.insertedId);
          }
          if (key === 'name') {
            this.name = user.name;
          }
          if (key === 'email') {
            this.email = user.email;
          }
          if (key === 'createdAt') {
            this.createdAt = new Date(user.createdAt).toISOString();
          }
          if (key === 'inactivatedIn') {
            if (user.inactivatedIn) {
              this.inactivatedIn = new Date(user.inactivatedIn).toISOString();
            } else {
              this.inactivatedIn = null;
            }
          }
          if (key === 'active') {
            this.active = user.active;
          }
          if (key === 'password') {
            this.password = user.password;
          }
          if (key === 'urlImage') {
            this.urlImage = user.urlImage;
          }
          if (key === 'rules') {
            this.rules = user.rules.map((rule: Rule) => new Rule(rule));
          }
          if (key === 'phone') {
            this.phone = user.phone;
          }
          if (key === 'type') {
            this.type = user.type;
          }
          if (key === 'typePhone') {
            this.typePhone = user.typePhone;
          }
          if (key === 'dueDate') {
            this.dueDate = new Date(user.dueDate).toISOString();
          }
          if (key === 'plan') {
            this.plan = user.plan;
          }
        });
      }
    });
  };

  private getUser = (): User => {
    const keysProduct = Object.keys(this);
    let user = {};
    keysProduct.forEach((key) => {
      const crrKey = key as keysUser;
      if (typeof this[crrKey] !== 'function') {
        user = { ...user, [key]: this[crrKey] };
      }
    });
    return user as User;
  };

  private findUserById = async (_id: ObjectId): Promise<User> => {
    const db = await connection();
    const collectionDb = db.collection(collecionsEnum.USERS);
    const userExists = await collectionDb.findOne({ _id });
    if (!userExists) {
      throw new Error(errorEnum.USER_NOT_FOUND);
    }
    return userExists as User;
  };

  private findUserByEmail = async (email: string): Promise<User> => {
    const db = await connection();
    const collectionDb = db.collection(collecionsEnum.USERS);
    return await collectionDb.findOne({ email });
  };

  private createUser = async (req: NextApiRequest): Promise<User> => {
    const db = await connection();
    const { password, email } = this;

    if (await this.findUserByEmail(email)) {
      req.body.status = 409;
      throw new Error(errorEnum.USER_EXISTS);
    }
    const collectionDb = db.collection(collecionsEnum.USERS);
    this.populateClass({
      password: await hash(password, await genSalt(12)),
      createdAt: new Date().toISOString(),
      inactivatedIn: null,
      active: true,
    });
    const currentUser = this.getUser();
    const { insertedId } = await collectionDb.insertOne({
      ...currentUser,
      rules: [...currentUser.rules, ...ruleAllAccess],
    });
    const { password: _, ...rest } = this.getUser();
    return ({ insertedId, ...rest } as unknown) as User;
  };

  private signIn = async (req: NextApiRequest): Promise<User> => {
    const userExists = await this.findUserByEmail(this.email);
    if (!userExists) {
      req.body.status = 401;
      throw new Error(errorEnum.INVALID_EMAIL_OR_PASS);
    }
    if (!(await compare(this.password, userExists.password))) {
      req.body.status = 401;
      throw new Error(errorEnum.INVALID_EMAIL_OR_PASS);
    }
    return userExists as User;
  };

  private createToken = (getRules = false) => {
    const rules = getRules ? this.rules : undefined;
    const { password, ...rest } = this;
    return jwt.sign({ ...rest, rules }, returnEnv(EnvEnum.SECRET_TOKEN), {
      expiresIn: returnEnv(EnvEnum.EXPIRATION_TOKEN),
    });
  };

  checkEmail = async (): Promise<User> => {
    const userExists = await this.findUserByEmail(this.email);
    if (userExists) {
      throw new Error(errorEnum.EMAIL_ALREADY_IN_USE);
    }
    return userExists as User;
  };

  newUser = async (req: NextApiRequest): Promise<string> => {
    this.populateClass(await this.createUser(req));
    return this.createToken();
  };

  login = async (req: NextApiRequest): Promise<string> => {
    this.populateClass(await this.signIn(req));
    const token = this.createToken();
    return token;
  };

  getUserById = async (_id: ObjectId): Promise<string> => {
    this.populateClass(await this.findUserById(_id));
    return this.createToken(true);
  };
}
