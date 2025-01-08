import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { users } from '../../user/database/user';

export const tokens = pgTable('tokens', {
  id: uuid().defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  refreshToken: varchar('refresh_token', { length: 512 }).notNull(),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at', {
    withTimezone: true,
  }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
