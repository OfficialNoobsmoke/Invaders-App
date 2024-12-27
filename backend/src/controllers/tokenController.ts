import { Request, Response } from 'express';
import { general, errorMessages } from '../constants/constants';
import { IAuthCookie } from '../interfaces/IAuthCookie';
import { tokenRepository } from '../repositories/tokenRepository';
import { hmacHashJwt } from '../utils/cryptography';
import { verify } from '../utils/jwtToken';
import { generateNewTokenForUser } from '../services/tokenService';
import { setAuthenticationCookie } from '../services/authenticationService';

export const refreshToken = async (req: Request, res: Response) => {
  const authCookie = req.signedCookies[general.AUTH_COOKIE] as IAuthCookie;
  if (!authCookie) {
    return res.status(401).json({ message: errorMessages.NO_COOKIE_FOUND });
  }
  const refreshToken = authCookie.authentication.refreshToken;
  const refreshTokenHash = hmacHashJwt(refreshToken);
  if (!isRefreshTokenAvailable(authCookie.userId, refreshToken)) {
    return res.sendStatus(403);
  }

  const { tokenData, refreshTokenData } = await generateNewTokenForUser(
    authCookie.userId,
    refreshTokenHash
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

  return res.sendStatus(200);
};

const isRefreshTokenAvailable = async (
  userId: string,
  refreshToken: string
) => {
  const isRefreshTokenRevoked = await tokenRepository.refreshTokenExists(
    userId,
    hmacHashJwt(refreshToken)
  );
  if (isRefreshTokenRevoked) {
    return false;
  }
  if (!verify(refreshToken)) {
    return false;
  }

  return true;
};
