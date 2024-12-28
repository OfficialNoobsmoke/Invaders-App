import { Request, Response, NextFunction } from 'express';
import { ErrorRequestHandler } from 'express';
import { errorMessages, general } from '../constants/constants';
import { BaseError } from '../exceptions/baseError';

const errorHandler: ErrorRequestHandler = (
  err: Error & { statusCode?: number },
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const isDev = process.env.NODE_ENV === general.DEV_MODE;
  if (err instanceof BaseError) {
    if (err.isOperational) {
      return res
        .status(err.statusCode)
        .json({ message: err.message, ...(isDev && { stack: err.stack }) });
    } else {
      return res.status(500).json({
        message: errorMessages.INTERNAL_SERVER_ERROR,
        ...(isDev && { stack: err.stack }),
      });
    }
  }
};

export default errorHandler;
