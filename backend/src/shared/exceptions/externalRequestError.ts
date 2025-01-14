import { HttpStatusCode } from 'axios';
import { HTTPError } from './httpError';
import { BaseError } from './baseError';

export class ExternalRequestError extends BaseError {
  constructor(message: string | undefined) {
    super(message);
  }

  toHTTPError(): HTTPError {
    return new HTTPError(this.message, HttpStatusCode.ServiceUnavailable);
  }
}
