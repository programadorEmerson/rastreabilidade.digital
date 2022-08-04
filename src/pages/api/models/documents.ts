export class Document {
  private name: string;
  private url: string;

  constructor({ name, url }: Document) {
    this.name = name;
    this.url = url;
  }

  public returnDocuments = (): Document => {
    return this;
  };
}
