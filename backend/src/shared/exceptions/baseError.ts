import { HTTPError } from './httpError';

export abstract class BaseError {
  isOperational: boolean;
  errors: string[] = [];
  constructor(errors: string[], isOperational = true) {
    this.errors = errors;
    this.isOperational = isOperational;
  }

  abstract toHTTPError(): HTTPError;
}
