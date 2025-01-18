import { HttpStatusCode } from 'axios';
import { BaseError } from './baseError';
import { HTTPError } from './httpError';
import { IHTTPError } from '../interfaces/IhttpError';

export class AuthenticationError extends BaseError implements IHTTPError {
  constructor(errors: string[]) {
    super(errors);
  }

  toHTTPError(): HTTPError {
    return new HTTPError(this.errors, HttpStatusCode.Unauthorized);
  }
}
