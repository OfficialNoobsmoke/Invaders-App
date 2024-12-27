import { IRequestUser } from '../interfaces/IRequestUser';
import { Request, Response } from 'express';
import { createDiscordTokenForUser } from './discordAuthenticationService';
import { generateNewTokenForUser } from './tokenService';
import { frontEndRoutes, general } from '../constants/constants';
import { getRedirectUrlRoute } from '../utils/redirectUrlRouteBuilder';
import { AuthInfo } from '../interfaces/IAuthInfo';
import { IAuthCookie } from '../interfaces/IAuthCookie';

export const saveAuthenticationData = async (req: Request, res: Response) => {
  const user = req.user as IRequestUser;
  const discordAuthentication = (req.authInfo as AuthInfo)
    .discordAuthentication;
  if (!user || !discordAuthentication) {
    return res.redirect(getRedirectUrlRoute(frontEndRoutes.INDEX_PAGE));
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
  res.redirect(getRedirectUrlRoute(frontEndRoutes.HOME_PAGE));
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
