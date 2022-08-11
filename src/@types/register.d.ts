import { Rule } from '@pages/api/models/rules';

export type RegisterType = {
  name: string;
  email: string;
  emailConfirm: string;
  password: string;
  confirmPassword: string;
  document: string;
  phone: string;
  type: string;
  typePhone: string;
  plan: string;
  rules: Rule[] | [];
  dueDate: string;
};

export type TypesPlan = 'FREE' | 'OURO' | 'PRATA' | 'BRONZE' | 'PLATINIUM';
