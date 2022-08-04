export class Authorized {
  private phone: string;
  private email: string;

  constructor({ phone, email }: Authorized) {
    this.phone = phone;
    this.email = email;
  }

  public returnAuthorized = (): Authorized => {
    return this;
  };
}
