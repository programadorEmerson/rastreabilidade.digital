export class Rule {
  private action: string;
  private subject: string;

  constructor({ action, subject }: Rule) {
    this.action = action;
    this.subject = subject;
  }

  public returnRule = (): Rule => {
    return this;
  };
}
