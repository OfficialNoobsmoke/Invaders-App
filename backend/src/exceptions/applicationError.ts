import { BaseError } from './baseError';

export class ApplicationError extends BaseError {
  constructor(message: string, isOperational = true) {
    super(message, 500, isOperational);
  }
}
