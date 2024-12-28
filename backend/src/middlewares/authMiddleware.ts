import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { errorMessages, general } from '../constants/constants';
import { IAuthCookie } from '../interfaces/IAuthCookie';
import { refreshExpiredToken } from '../services/authenticationService';

const authorizationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authCookie = req.signedCookies[general.AUTH_COOKIE];
    if (!authCookie) {
      return res.status(401).json({ message: errorMessages.NO_COOKIE_FOUND });
    }
    const {
      authentication: { accessToken },
    } = authCookie as IAuthCookie;
    const decoded = jwt.decode(accessToken) as jwt.JwtPayload | null;
    if (!decoded) {
      return res.status(401).json({ message: errorMessages.INVALID_TOKEN });
    }

    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      await refreshExpiredToken(req, res, authCookie);
      next();
      return;
    }
    jwt.verify(accessToken, process.env.JWT_SECRET!, (err) => {
      if (err) {
        return res
          .status(401)
          .json({ message: errorMessages.TOKEN_NOT_VERIFIED });
      }

      next();
    });
  } catch (error) {
    next(error);
  }
};

export default authorizationMiddleware;
