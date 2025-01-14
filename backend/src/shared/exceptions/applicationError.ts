import { HttpStatusCode } from 'axios';
import { IHTTPError } from '../interfaces/IhttpError';
import { BaseError } from './baseError';
import { HTTPError } from './httpError';

export class ApplicationError extends BaseError implements IHTTPError {
  constructor(message: string, isOperational = true) {
    super(message, isOperational);
  }

  toHTTPError(): HTTPError {
    return new HTTPError(this.message, HttpStatusCode.InternalServerError);
  }
}
