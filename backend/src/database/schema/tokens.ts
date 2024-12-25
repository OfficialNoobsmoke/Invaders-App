import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  pgEnum,
  boolean,
} from 'drizzle-orm/pg-core';
import { users } from './user';

export const tokenTypeEnum = pgEnum('token_type', ['discord', 'jwt']);

export const tokens = pgTable('tokens', {
  id: uuid().defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  tokenType: tokenTypeEnum('token_type').notNull(),
  accessToken: varchar('access_token', { length: 512 }),
  refreshToken: varchar('refresh_token', { length: 512 }),
  revoked: boolean('revoked').notNull().default(false),
  accessTokenExpiresAt: timestamp('access_token_expires_at', {
    withTimezone: true,
  }).notNull(),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at', {
    withTimezone: true,
  }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
