import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { errorMessages, general } from '../constants/constants';

interface UserData {
  accessToken: string;
  userId: string;
}

const authorizationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookie = req.signedCookies[general.AUTH_COOKIE];
    if (!cookie) {
      return res.status(401).json({ message: errorMessages.NO_COOKIE_FOUND });
    }
    const { accessToken } = cookie as UserData;
    const decoded = jwt.decode(accessToken) as jwt.JwtPayload | null;
    if (!decoded) {
      return res.status(401).json({ message: errorMessages.INVALID_TOKEN });
    }
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return res.status(401).json({ message: errorMessages.TOKEN_EXPIRED });
    }
    jwt.verify(accessToken, process.env.JWT_SECRET!, (err, payload) => {
      if (err) {
        return res
          .status(401)
          .json({ message: errorMessages.TOKEN_NOT_VERIFIED });
      }
      req.user = {
        userId: cookie.userId,
        ...(payload as object),
      };

      next();
    });
  } catch (error) {
    console.error('Error in authorization middleware:', error);
    res.status(500).json({ message: errorMessages.INTERNAL_SERVER_ERROR });
  }
};

export default authorizationMiddleware;
