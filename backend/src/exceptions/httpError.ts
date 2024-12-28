import { BaseError } from './baseError';

export class HTTPError extends BaseError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode, true);
  }
}
