import { FeatureCodeEnum } from '@enums/enum.feature.code';

export class Rule {
  action: string;
  subject: FeatureCodeEnum;

  constructor({ action, subject }: Rule) {
    this.action = action;
    this.subject = subject;
  }

  public returnRule = (): Rule => {
    return this;
  };
}
