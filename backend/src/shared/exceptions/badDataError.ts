import { HttpStatusCode } from 'axios';
import { HTTPError } from './httpError';
import { BaseError } from './baseError';

export class BadDataError extends BaseError {
  constructor(message: string | undefined) {
    super(message);
  }

  toHTTPError(): HTTPError {
    return new HTTPError(this.message, HttpStatusCode.BadRequest);
  }
}
