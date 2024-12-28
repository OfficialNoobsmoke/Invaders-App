export abstract class BaseError extends Error {
  statusCode: number;
  isOperational: boolean;
  constructor(
    message: string | undefined,
    statusCode: number,
    isOperational = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
  }
}
