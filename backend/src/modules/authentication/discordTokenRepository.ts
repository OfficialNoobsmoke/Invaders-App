import { getDatabase } from '../../libs/database/database';
import { discordTokens } from './database/discordTokens';
import { eq } from 'drizzle-orm';

export const discordTokenRepository = {
  async createToken({
    refreshToken,
    accessTokenExpiresAt,
    refreshTokenExpiresAt,
    parentId,
  }: {
    refreshToken: string;
    accessTokenExpiresAt: Date;
    refreshTokenExpiresAt: Date;
    parentId: string;
  }) {
    const db = await getDatabase();

    return await db
      .insert(discordTokens)
      .values({
        refreshToken,
        accessTokenExpiresAt,
        refreshTokenExpiresAt,
        parentId,
      })
      .returning();
  },

  async updateToken({
    parentId,
    refreshToken,
    accessTokenExpiresAt,
    refreshTokenExpiresAt,
  }: {
    refreshToken: string;
    parentId: string;
    accessTokenExpiresAt: Date;
    refreshTokenExpiresAt: Date;
  }) {
    const db = await getDatabase();

    return await db
      .update(discordTokens)
      .set({
        ...(refreshToken && { refreshToken }),
        ...(accessTokenExpiresAt && { accessTokenExpiresAt }),
        ...(refreshTokenExpiresAt && { refreshTokenExpiresAt }),
      })
      .where(eq(discordTokens.parentId, parentId))
      .returning();
  },
};
