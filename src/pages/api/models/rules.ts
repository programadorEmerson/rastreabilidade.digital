import { FeatureCodeEnum } from '@enums/enum.feature.code';

export class Rule {
  action = 'read';
  subject: FeatureCodeEnum = FeatureCodeEnum.FC_ALL;

  constructor(rule?: Rule) {
    if (rule) {
      const keysRule = Object.keys(rule) as (keyof Rule)[];
      keysRule.forEach((key) => {
        Object.assign(this, { [key]: rule[key] });
      });
    }
  }

  ruleAllUSer = (): Rule[] => {
    const { DELETE, READ, UPDATE, CREATE } = FeatureCodeEnum;
    return [READ, CREATE, UPDATE, DELETE].map((action) => {
      return new Rule({ action, subject: FeatureCodeEnum.FC_ALL } as Rule);
    });
  };

  returnRule = (): Rule => {
    return this;
  };
}
