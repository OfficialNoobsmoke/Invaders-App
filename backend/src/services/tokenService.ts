import { tokenRepository } from '../repositories/tokenRepository';
import { hmacHashString } from '../utils/cryptography';
import jwtToken from '../utils/jwtToken';

export const generateNewTokenForUser = async (
  userId: string,
  oldRefreshToken?: string
) => {
  const tokenData = jwtToken.generateToken(
    userId,
    +process.env.JWT_ACCESS_TOKEN_EXPIRY!
  );
  const refreshTokenData = jwtToken.generateToken(
    userId,
    +process.env.JWT_REFRESH_TOKEN_EXPIRY!
  );
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
    refreshToken: hmacHashString(refreshToken),
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
    refreshToken: hmacHashString(refreshToken),
    refreshTokenExpiresAt,
    oldRefreshToken: hmacHashString(oldRefreshToken),
  });
};
