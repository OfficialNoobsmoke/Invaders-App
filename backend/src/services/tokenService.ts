import { tokenRepository } from '../repositories/tokenRepository';
import jwtToken from '../utils/jwtToken';

const generateToken = async (userId: string) => {
  const tokenData = jwtToken.generateToken(userId, 300000); // 5 minutes
  const refreshTokenData = jwtToken.generateToken(userId, 604800000); // 1 week
  await tokenRepository.createToken({
    userId: userId,
    tokenType: 'jwt',
    accessToken: tokenData.accessToken,
    refreshToken: refreshTokenData.accessToken,
    accessTokenExpiresAt: tokenData.expiresAt,
    refreshTokenExpiresAt: refreshTokenData.expiresAt,
  });
  return { tokenData, refreshTokenData };
};

export default { generateToken };
