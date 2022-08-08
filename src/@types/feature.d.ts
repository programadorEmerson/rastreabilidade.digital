import { FeatureCodeEnum } from '@enums/enum.feature.code';

export type Rule = {
  action: string;
  subject: FeatureCodeEnum;
};
