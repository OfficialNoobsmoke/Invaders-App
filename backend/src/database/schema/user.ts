//import { relations } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
//import { usersToRealmServers } from './usersToRealmServers';

export const users = pgTable('users', {
  id: uuid().defaultRandom().primaryKey(),
  discordId: varchar('discord_id', { length: 18 }).notNull(),
  username: varchar('username', { length: 32 }).notNull(),
  displayName: varchar('displayname', { length: 32 }),
  email: varchar('email', { length: 255 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// export const usersRelations = relations(users, ({ many }) => ({
//   usersToRealmServers: many(usersToRealmServers),
// }));
