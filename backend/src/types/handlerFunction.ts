import { Request, Response, NextFunction } from 'express';

type HandlerFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export default HandlerFunction;
