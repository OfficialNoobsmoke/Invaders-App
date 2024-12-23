import { pgTable, uuid, varchar, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { users } from './user';

export const tokenTypeEnum = pgEnum('token_type', ['discord', 'jwt']);

export const tokens = pgTable('tokens', {
  id: uuid().defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  tokenType: tokenTypeEnum('token_type').notNull(),
  bearerToken: varchar('bearer_token', { length: 512 }).notNull(),
  refreshToken: varchar('refresh_token', { length: 512 }),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
