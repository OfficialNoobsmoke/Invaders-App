import { Request, Response, NextFunction } from 'express';
import { ErrorRequestHandler } from 'express';
import { errorMessages, general } from '../../shared/constants/constants';
import { BaseError } from '../../shared/exceptions/baseError';

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
      const httpError = err.toHTTPError();
      return res
        .status(httpError.statusCode)
        .json({ errors: httpError.errors, ...(isDev && { stack: err.stack }) });
    } else {
      return res.status(500).json({
        message: errorMessages.INTERNAL_SERVER_ERROR,
        ...(isDev && { stack: err.stack }),
      });
    }
  }

  res.status(500).json({
    message: err.message || errorMessages.INTERNAL_SERVER_ERROR,
    ...(isDev && { stack: err.stack }),
  });
};

export default errorHandler;
