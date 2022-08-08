export type ResponseThrow = { message: string };
export type ResponseYup = { message: string };
export type TypeFindWithId = {
  _id: string;
  idToken: string;
};
export type TypeFindWithCode = {
  code: string;
  idToken: string;
};

export type ResponseAuthProps = {
  response: string;
};
