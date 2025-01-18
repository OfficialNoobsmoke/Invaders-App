import { HttpStatusCode } from 'axios';
import { IHTTPError } from '../interfaces/IhttpError';
import { BaseError } from './baseError';
import { HTTPError } from './httpError';

export class ApplicationError extends BaseError implements IHTTPError {
  constructor(errors: string[], isOperational = true) {
    super(errors, isOperational);
  }

  toHTTPError(): HTTPError {
    return new HTTPError(this.errors, HttpStatusCode.InternalServerError);
  }
}
