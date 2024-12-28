import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { tokens } from './tokens';

export const discordTokens = pgTable('discord_tokens', {
  id: uuid().defaultRandom().primaryKey(),
  refreshToken: varchar('refresh_token', { length: 512 }),
  accessTokenExpiresAt: timestamp('access_token_expires_at', {
    withTimezone: true,
  }).notNull(),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at', {
    withTimezone: true,
  }).notNull(),
  parentId: uuid('parent_id')
    .references(() => tokens.id)
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
