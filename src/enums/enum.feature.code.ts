import { Rule } from '@pages/api/models/rules';

import { TypesPlan } from '@@types/register';

export enum FeatureCodeEnum {
  NOT_FOUND = 'F0000',
  FC_ALL = 'FC_ALL',
  FREE = 'price_1LUKmsC71S1iuUQjXUridQKG',
  OURO = 'price_1LUKr8C71S1iuUQjfpjMbKrz',
  PRATA = 'price_1LUKpfC71S1iuUQjzVw9Nv2G',
  BRONZE = 'price_1LUKoEC71S1iuUQjd13F35y1',
  PLATINIUM = 'price_1LUKs0C71S1iuUQjQlII2PHA',
  READ = 'read',
  DELETE = 'delete',
  UPDATE = 'update',
  CREATE = 'create',
}

export const returnCodeEnum = (feature: string) => {
  switch (feature) {
    case 'Free':
      return FeatureCodeEnum.FREE;
    case 'Ouro':
      return FeatureCodeEnum.OURO;
    case 'Prata':
      return FeatureCodeEnum.PRATA;
    case 'Bronze':
      return FeatureCodeEnum.BRONZE;
    case 'Platinium':
      return FeatureCodeEnum.PLATINIUM;
    case 'FC_ALL':
      return FeatureCodeEnum.FC_ALL;
    default:
      return FeatureCodeEnum.NOT_FOUND;
  }
};

export const returnRoleType = (feature: TypesPlan): Rule[] => {
  return [
    ({
      action: 'read',
      subject: FeatureCodeEnum[feature],
    } as unknown) as Rule,
    ({
      action: 'create',
      subject: FeatureCodeEnum[feature],
    } as unknown) as Rule,
    ({
      action: 'update',
      subject: FeatureCodeEnum[feature],
    } as unknown) as Rule,
    ({
      action: 'delete',
      subject: FeatureCodeEnum[feature],
    } as unknown) as Rule,
  ];
};
