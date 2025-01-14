import { HTTPError } from './httpError';

export abstract class BaseError extends Error {
  isOperational: boolean;
  constructor(message: string | undefined, isOperational = true) {
    super(message);
    this.isOperational = isOperational;
  }

  abstract toHTTPError(): HTTPError;
}
