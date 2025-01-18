export class HTTPError {
  statusCode: number;
  errors: string[] = [];
  constructor(errors: string[], statusCode: number) {
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
