export type ResponseThrow = { message: string };
export type ResponseYup = { message: string };

export type TypeFindWithId = {
  _idCollection: string;
  _idElement: string;
};

export type TypeGetAllElements = {
  _idCollection: string;
  active: string;
};

export type TypeFindWithCode = {
  code: string;
  _idCollection: string;
};

export type ResponseAuthProps = {
  response: string;
};

export type ResponseGenericType = {
  status: number;
  response: T | boolean;
};
