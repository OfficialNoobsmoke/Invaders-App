import { Request, Response } from 'express';
import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (
  err: Error & { statusCode?: number },
  req: Request,
  res: Response
) => {
  const statusCode = err.statusCode || 500;

  const isDev = process.env.NODE_ENV === 'dev';

  const response = {
    message: err.message || 'Internal Server Error',
    ...(isDev && { stack: err.stack }),
  };

  res.status(statusCode).json(response);
};

export default errorHandler;
