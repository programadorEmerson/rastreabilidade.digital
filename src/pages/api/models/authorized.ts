export class Authorized {
  phone = '';
  email = '';

  constructor(authorized?: Authorized) {
    if (authorized) {
      const keysAuthorized = Object.keys(authorized) as (keyof Authorized)[];
      keysAuthorized.forEach((key) => {
        Object.assign(this, { [key]: authorized[key] });
      });
    }
  }

  public returnAuthorized = (): Authorized => {
    return this;
  };
}
