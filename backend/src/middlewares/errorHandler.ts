import { Request, Response, NextFunction } from 'express';
import { ErrorRequestHandler } from 'express';
import { errorMessages, general } from '../constants/constants';

const errorHandler: ErrorRequestHandler = (
  err: Error & { statusCode?: number },
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;

  const isDev = process.env.NODE_ENV === general.DEV_MODE;

  const response = {
    message: err.message || errorMessages.INTERNAL_SERVER_ERROR,
    ...(isDev && { stack: err.stack }),
  };

  res.status(statusCode).json(response);
};

export default errorHandler;
