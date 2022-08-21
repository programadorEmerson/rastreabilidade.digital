export class Document {
  name = '';
  url = '';

  constructor(document?: Document) {
    if (document) {
      const keysDocument = Object.keys(document) as (keyof Document)[];
      keysDocument.forEach((key) => {
        Object.assign(this, { [key]: document[key] });
      });
    }
  }

  public returnDocuments = (): Document => {
    return this;
  };
}
