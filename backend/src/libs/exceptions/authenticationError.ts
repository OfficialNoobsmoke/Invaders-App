import { BaseError } from './baseError';

export class AuthenticationError extends BaseError {
  constructor(message: string | undefined) {
    super(message, 401);
  }
}
