import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

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
    const cookie = req.signedCookies['user_data'];

    if (!cookie) {
      return res.status(401).json({ message: 'Unauthorized: No cookie found' });
    }

    const { accessToken } = cookie as UserData;

    const decoded = jwt.decode(accessToken) as jwt.JwtPayload | null;

    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return res.status(401).json({ message: 'Unauthorized: Token expired' });
    }

    jwt.verify(accessToken, process.env.JWT_SECRET!, (err, payload) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }

      req.user = {
        userId: cookie.userId,
        ...(payload as object),
      };

      next();
    });
  } catch (error) {
    console.error('Error in authorization middleware:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default authorizationMiddleware;
