import { Request, Response, NextFunction } from 'express';
import HandlerFunction from '../types/handlerFunctiond';

const asyncHandler = (fn: HandlerFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
