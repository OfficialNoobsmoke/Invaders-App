import { HttpStatusCode } from 'axios';
import { BaseError } from './baseError';
import { HTTPError } from './httpError';
import { IHTTPError } from '../interfaces/IhttpError';

export class AuthenticationError extends BaseError implements IHTTPError {
  constructor(message: string | undefined) {
    super(message);
  }

  toHTTPError(): HTTPError {
    return new HTTPError(this.message, HttpStatusCode.Unauthorized);
  }
}
