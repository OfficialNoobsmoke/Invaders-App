import { and, desc, eq } from 'drizzle-orm';
import { tokens } from '../database/schema/tokens';
import { getDatabase } from '../database/database';
import TokenType from '../types/token';

export const tokenRepository = {
  async getLatestTokenByUserIdAndType(userId: string, tokenType: TokenType) {
    const db = await getDatabase();

    const result = await db.query.tokens.findFirst({
      where: and(eq(tokens.userId, userId), eq(tokens.tokenType, tokenType)),
      orderBy: desc(tokens.createdAt),
    });

    return result;
  },

  async createToken({
    userId,
    tokenType,
    accessToken,
    refreshToken,
    accessTokenExpiresAt,
    refreshTokenExpiresAt,
  }: {
    userId: string;
    tokenType: TokenType;
    accessToken: string;
    refreshToken?: string;
    accessTokenExpiresAt: Date;
    refreshTokenExpiresAt: Date;
  }) {
    const db = await getDatabase();

    await db.insert(tokens).values({
      userId,
      tokenType,
      accessToken,
      refreshToken,
      revoked: false,
      accessTokenExpiresAt,
      refreshTokenExpiresAt,
    });
  },

  async deleteTokensByUserIdAndType(userId: string, tokenType: TokenType) {
    const db = await getDatabase();

    await db
      .delete(tokens)
      .where(and(eq(tokens.userId, userId), eq(tokens.tokenType, tokenType)));
  },
};
