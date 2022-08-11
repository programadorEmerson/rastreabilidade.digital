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
    case 'price_1LUKmsC71S1iuUQjXUridQKG':
      return FeatureCodeEnum.FREE;
    case 'price_1LUKr8C71S1iuUQjfpjMbKrz':
      return FeatureCodeEnum.OURO;
    case 'price_1LUKpfC71S1iuUQjzVw9Nv2G':
      return FeatureCodeEnum.PRATA;
    case 'price_1LUKoEC71S1iuUQjd13F35y1':
      return FeatureCodeEnum.BRONZE;
    case 'price_1LUKs0C71S1iuUQjQlII2PHA':
      return FeatureCodeEnum.PLATINIUM;
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
