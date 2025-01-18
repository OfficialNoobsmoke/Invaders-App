import { HttpStatusCode } from 'axios';
import { HTTPError } from './httpError';
import { BaseError } from './baseError';

export class NotFoundError extends BaseError {
  constructor(errors: string[]) {
    super(errors);
  }

  toHTTPError(): HTTPError {
    return new HTTPError(this.errors, HttpStatusCode.NotFound);
  }
}
