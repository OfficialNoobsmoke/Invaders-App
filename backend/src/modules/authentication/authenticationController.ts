import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {
  general,
  errorMessages,
  frontEndRoutes,
} from '../../shared/constants/constants';
import { AuthCookie } from './interfaces/authCookie';
import {
  clearSessionData,
  isRefreshTokenAvailable,
  updateCookieWithNewTokens,
} from './services/authenticationService';
import { buildRouteUrl } from '../../shared/utils/urlRouteBuilder';
import { AuthenticationError } from '../../shared/exceptions/authenticationError';

export const refreshToken = async (req: Request, res: Response) => {
  const authCookie = req.signedCookies[general.AUTH_COOKIE] as AuthCookie;
  if (!authCookie) {
    return res.status(401).json({ message: errorMessages.NO_COOKIE_FOUND });
  }
  const refreshToken = authCookie.authentication.refreshToken;
  const isRefreshTokenValid = await isRefreshTokenAvailable(
    authCookie.userId,
    refreshToken
  );
  if (!isRefreshTokenValid) {
    throw new AuthenticationError(errorMessages.TOKEN_EXPIRED);
  }
  await updateCookieWithNewTokens(res, authCookie, refreshToken);

  return res.sendStatus(200);
};

export const authenticationFailure = async (req: Request, res: Response) => {
  return res.redirect(buildRouteUrl(frontEndRoutes.INDEX_PAGE));
};

export const logOut = async (req: Request, res: Response) => {
  const authHeader = req.headers['cookie'];
  if (!authHeader) {
    return res.sendStatus(204);
  }

  const userData = req.signedCookies[general.AUTH_COOKIE];
  if (!userData) {
    return res.sendStatus(204);
  }

  await clearSessionData(
    res,
    userData.userId,
    userData.authentication.refreshToken
  );
  res.sendStatus(200);
};

export const checkAuthentication = async (req: Request, res: Response) => {
  const authCookie = req.signedCookies[general.AUTH_COOKIE];
  if (!authCookie) {
    throw new AuthenticationError(errorMessages.NO_COOKIE_FOUND);
  }
  const {
    authentication: { accessToken },
  } = authCookie as AuthCookie;
  const decoded = jwt.decode(accessToken) as jwt.JwtPayload | null;
  if (!decoded || (decoded.exp && Date.now() >= decoded.exp * 1000)) {
    throw new AuthenticationError(errorMessages.INVALID_TOKEN);
  }

  jwt.verify(accessToken, process.env.JWT_SECRET!, (err) => {
    if (err) {
      throw new AuthenticationError(errorMessages.TOKEN_NOT_VERIFIED);
    }

    return res.sendStatus(200);
  });
};
