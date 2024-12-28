import { Request, Response } from 'express';
import { general, errorMessages, frontEndRoutes } from '../constants/constants';
import { IAuthCookie } from '../interfaces/IAuthCookie';
import {
  clearSessionData,
  isRefreshTokenAvailable,
  updateCookieWithNewTokens,
} from '../services/authenticationService';
import { buildRouteUrl } from '../utils/urlRouteBuilder';

export const refreshToken = async (req: Request, res: Response) => {
  const authCookie = req.signedCookies[general.AUTH_COOKIE] as IAuthCookie;
  if (!authCookie) {
    return res.status(401).json({ message: errorMessages.NO_COOKIE_FOUND });
  }
  const refreshToken = authCookie.authentication.refreshToken;
  const isRefreshTokenValid = await isRefreshTokenAvailable(
    authCookie.userId,
    refreshToken
  );
  if (!isRefreshTokenValid) {
    return res.sendStatus(403);
  }
  await updateCookieWithNewTokens(res, authCookie, refreshToken);

  return res.sendStatus(200);
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

  clearSessionData(res, userData.userId, userData.authentication.refreshToken);
  res.status(200).redirect(buildRouteUrl(frontEndRoutes.HOME_PAGE));
  res.end();
};
