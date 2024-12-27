import { and, eq } from 'drizzle-orm';
import { tokens } from '../database/schema/tokens';
import { getDatabase } from '../database/database';
import { discordTokens } from '../database/schema/discordTokens';

export const tokenRepository = {
  async createToken({
    userId,
    refreshToken,
    refreshTokenExpiresAt,
  }: {
    userId: string;
    refreshToken: string;
    refreshTokenExpiresAt: Date;
  }): Promise<string> {
    const db = await getDatabase();

    return (
      await db
        .insert(tokens)
        .values({
          userId,
          refreshToken,
          refreshTokenExpiresAt,
        })
        .returning({ id: tokens.id })
    )[0].id;
  },

  async refreshTokenExists(
    userId: string,
    refreshToken: string
  ): Promise<boolean> {
    const db = await getDatabase();

    const tokenData = await db.query.tokens.findFirst({
      where: (tokens, { eq }) =>
        and(eq(tokens.userId, userId), eq(tokens.refreshToken, refreshToken)),
    });

    return !!tokenData;
  },

  async updateToken({
    userId,
    refreshToken,
    refreshTokenExpiresAt,
    oldRefreshToken,
  }: {
    userId: string;
    refreshToken: string;
    refreshTokenExpiresAt: Date;
    oldRefreshToken: string;
  }): Promise<string> {
    const db = await getDatabase();
    const tokenRecord = await db.query.tokens.findFirst({
      columns: { id: true },
      where: (tokens, { eq }) =>
        and(
          eq(tokens.userId, userId),
          eq(tokens.refreshToken, oldRefreshToken)
        ),
    });
    if (!tokenRecord) {
      throw new Error('Token not found');
    }
    await db
      .update(tokens)
      .set({
        refreshToken,
        refreshTokenExpiresAt,
      })
      .where(eq(tokens.id, tokenRecord.id));
    return tokenRecord.id;
  },

  async deleteTokenByRefreshToken(userId: string, refreshToken: string) {
    const db = await getDatabase();
    const tokenRecord = await db.query.tokens.findFirst({
      columns: { id: true },
      where: (tokens, { eq }) =>
        and(eq(tokens.userId, userId), eq(tokens.refreshToken, refreshToken)),
    });
    if (!tokenRecord) {
      throw new Error('Token not found');
    }
    await db
      .delete(discordTokens)
      .where(eq(discordTokens.parentId, tokenRecord.id));

    await db.delete(tokens).where(eq(tokens.id, tokenRecord.id));
  },
};
