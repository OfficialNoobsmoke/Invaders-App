import { tokenRepository } from '../repositories/tokenRepository';
import { hmacHashJwt } from '../utils/cryptography';
import jwtToken from '../utils/jwtToken';

export const generateNewTokenForUser = async (
  userId: string,
  oldRefreshToken?: string
) => {
  const tokenData = jwtToken.generateToken(userId, 300000); // 5 minutes
  const refreshTokenData = jwtToken.generateToken(userId, 604800000); // 1 week
  let id;
  if (oldRefreshToken) {
    id = await updateTokenForUser(
      userId,
      refreshTokenData.accessToken,
      refreshTokenData.expiresAt,
      oldRefreshToken
    );
  } else {
    id = await createTokenForUser(
      userId,
      refreshTokenData.accessToken,
      refreshTokenData.expiresAt
    );
  }

  return { id, tokenData, refreshTokenData };
};

const createTokenForUser = async (
  userId: string,
  refreshToken: string,
  refreshTokenExpiresAt: Date
) => {
  return await tokenRepository.createToken({
    userId: userId,
    refreshToken: hmacHashJwt(refreshToken),
    refreshTokenExpiresAt: refreshTokenExpiresAt,
  });
};

const updateTokenForUser = async (
  userId: string,
  refreshToken: string,
  refreshTokenExpiresAt: Date,
  oldRefreshToken: string
) => {
  return await tokenRepository.updateToken({
    userId,
    refreshToken: hmacHashJwt(refreshToken),
    refreshTokenExpiresAt,
    oldRefreshToken,
  });
};
