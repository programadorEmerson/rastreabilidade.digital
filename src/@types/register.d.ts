import { Rule } from '@pages/api/models/rules';

export type RegisterType = {
  name: string;
  email: string;
  emailConfirm: string;
  password: string;
  confirmPassword: string;
  document: string;
  phone: string;
  plan: string;
  rules: Rule[] | [];
  dueDate: string;
};
