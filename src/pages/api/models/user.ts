/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextApiRequest } from 'next';

import { ObjectId } from 'mongodb';

import { Rule } from '@pages/api/models/rules';

import { compare, genSalt, hash } from 'bcrypt';

import { collecionsEnum } from '@enums/enum.colections';
import { errorEnum } from '@enums/enum.errors';

import { GenericMongoDb } from './genericMongoDb';

export class User extends GenericMongoDb {
  _id: ObjectId = new ObjectId();
  name = '';
  email = '';
  phone = '';
  document = '';
  dueDate = '';
  plan = '';
  type = '';
  typePhone = 'fix';
  createdAt = new Date().toISOString();
  inactivatedIn: string | null = null;
  active = false;
  password = '';
  urlImage = '/img/no-image.png';
  rules: Rule[] = [];

  constructor(user?: any) {
    super();
    if (user) {
      this.populateClass(user);
    }
  }

  private populateClass = (user: User): void => {
    const keysUser = Object.keys(user) as (keyof User)[];
    keysUser.forEach((key) => {
      if (typeof this[key] !== 'function') {
        if (key === '_id') {
          Object.assign(this, { [key]: new ObjectId(user[key]) });
        } else if (key === 'rules') {
          const rules = new Rule();
          const createRules = !user[key].length
            ? rules.ruleAllUSer()
            : user[key];
          Object.assign(this, { [key]: createRules });
        } else {
          Object.assign(this, { [key]: user[key] });
        }
      }
    });
  };

  private getUser = (): User => {
    const keysUser = Object.keys(this) as (keyof User)[];
    const user = {} as User;
    keysUser.forEach((key) => {
      if (typeof this[key] !== 'function') {
        if (key === '_id') {
          Object.assign(user, { [key]: new ObjectId(this[key]) });
        } else {
          Object.assign(user, { [key]: this[key] });
        }
      }
    });
    return user;
  };

  private signIn = async (req: NextApiRequest): Promise<User> => {
    const userExists = await this.findByKey<User>({
      email: this.email,
      collection: collecionsEnum.USERS,
    });
    if (!userExists) throw new Error(errorEnum.INVALID_EMAIL_OR_PASS);
    const crrUSer = userExists as User;
    if (!(await compare(this.password, crrUSer.password)))
      throw new Error(errorEnum.INVALID_EMAIL_OR_PASS);
    return userExists as User;
  };

  private createToken = (getRules = false) => {
    const rules = getRules ? this.rules : undefined;
    const { password, ...rest } = this as User;
    return this.generateToken<User>({ ...rest, rules } as User);
  };

  checkEmail = async (): Promise<boolean> => {
    const userExists = await this.findByKey<User>({
      email: this.email,
      collection: collecionsEnum.USERS,
    });
    if (userExists) throw new Error(errorEnum.EMAIL_ALREADY_IN_USE);
    return userExists;
  };

  newUser = async (user: User): Promise<string> => {
    this.populateClass(user);
    const userAlreadyExists = await this.findByKey<User>({
      email: this.email,
      collection: collecionsEnum.USERS,
    });
    if (userAlreadyExists) throw new Error(errorEnum.EMAIL_ALREADY_IN_USE);
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    await this.createElement<User>({
      element: this.getUser(),
      collection: collecionsEnum.USERS,
    });
    return this.createToken();
  };

  login = async (req: NextApiRequest): Promise<string> => {
    this.populateClass(await this.signIn(req));
    const token = this.generateToken({ _id: this._id });
    return token;
  };

  getUserById = async (_id: ObjectId): Promise<string> => {
    const result = await this.findByKey<User>({
      _id: _id,
      collection: collecionsEnum.USERS,
    });
    if (!result) throw new Error(errorEnum.USER_NOT_FOUND);
    this.populateClass(result as User);
    return this.createToken(true);
  };
}
