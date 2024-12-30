import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid().defaultRandom().primaryKey(),
  discordId: varchar('discord_id', { length: 18 }).notNull().unique(),
  username: varchar('username', { length: 32 }).notNull().unique(),
  displayName: varchar('displayname', { length: 32 }),
  email: varchar('email', { length: 255 }).unique(),
  isInDiscord: boolean(),
  profileImageUrl: varchar('profile_image_url', { length: 255 }).notNull(),
  lastLogin: timestamp('last_login', { withTimezone: true })
    .defaultNow()
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
