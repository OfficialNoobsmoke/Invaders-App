import { IRequestUser } from '../interfaces/IRequestUser';
import { Request, Response } from 'express';
import { createDiscordTokenForUser } from './discordAuthenticationService';
import { generateNewTokenForUser } from './tokenService';
import { buildRouteUrl } from '../utils/urlRouteBuilder';
import { AuthInfo } from '../interfaces/IAuthInfo';
import { IAuthCookie } from '../interfaces/IAuthCookie';
import { tokenRepository } from '../repositories/tokenRepository';
import { hmacHashJwt } from '../utils/cryptography';
import { verify } from '../utils/jwtToken';
import { errorMessages, frontEndRoutes, general } from '../constants/constants';
import { AuthenticationError } from '../exceptions/authenticationError';

export const saveAuthenticationData = async (req: Request, res: Response) => {
  const user = req.user as IRequestUser;
  const discordAuthentication = (req.authInfo as AuthInfo)
    .discordAuthentication;
  if (!user || !discordAuthentication) {
    return res.redirect(buildRouteUrl(frontEndRoutes.INDEX_PAGE));
  }

  const { id, tokenData, refreshTokenData } = await generateNewTokenForUser(
    user.id
  );
  await createDiscordTokenForUser(id, discordAuthentication.refreshToken);

  const cookieData = {
    authentication: {
      accessToken: tokenData.accessToken,
      refreshToken: refreshTokenData.accessToken,
    },
    discordAuthentication: {
      accessToken: discordAuthentication.accessToken,
      refreshToken: discordAuthentication.refreshToken,
    },
    userId: user.id,
  } as IAuthCookie;
  setAuthenticationCookie(cookieData, res);
  if (user.isInDiscord) {
    res.redirect(buildRouteUrl(frontEndRoutes.HOME_PAGE));
  } else {
    res.redirect(buildRouteUrl(frontEndRoutes.NOT_IN_DISCORD_PAGE));
  }
};

export const setAuthenticationCookie = (
  authCookieData: IAuthCookie,
  res: Response
) => {
  const isDev = process.env.NODE_ENV! === general.DEV_MODE;
  res.cookie(general.AUTH_COOKIE, authCookieData, {
    signed: true,
    httpOnly: isDev,
    secure: isDev,
  });
};

export const isRefreshTokenAvailable = async (
  userId: string,
  refreshToken: string
) => {
  if (!verify(refreshToken)) {
    return false;
  }
  const refreshTokenHash = hmacHashJwt(refreshToken);
  const isRefreshTokenAvailable = await tokenRepository.refreshTokenExists(
    userId,
    refreshTokenHash
  );
  if (!isRefreshTokenAvailable) {
    return false;
  }

  return true;
};

export const updateCookieWithNewTokens = async (
  res: Response,
  authCookie: IAuthCookie,
  refreshToken: string
) => {
  const { tokenData, refreshTokenData } = await generateNewTokenForUser(
    authCookie.userId,
    refreshToken
  );

  const cookieData = {
    authentication: {
      accessToken: tokenData.accessToken,
      refreshToken: refreshTokenData.accessToken,
    },
    discordAuthentication: authCookie.discordAuthentication,
    userId: authCookie.userId,
  } as IAuthCookie;
  setAuthenticationCookie(cookieData, res);
};

export const clearSessionData = async (
  res: Response,
  userId: string,
  oldRefreshToken: string
) => {
  res.clearCookie(general.AUTH_COOKIE);
  const refreshTokenHash = hmacHashJwt(oldRefreshToken);
  await tokenRepository.deleteTokenByRefreshToken(userId, refreshTokenHash);
};

export const refreshExpiredToken = async (
  req: Request,
  res: Response,
  authCookie: IAuthCookie
) => {
  const refreshToken = authCookie.authentication.refreshToken;
  const isRefreshTokenValid = await isRefreshTokenAvailable(
    authCookie.userId,
    refreshToken
  );
  if (!isRefreshTokenValid) {
    throw new AuthenticationError(errorMessages.TOKEN_EXPIRED);
  }
  await updateCookieWithNewTokens(res, authCookie, refreshToken);
};
