import { pgEnum, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { users } from './user';
import { realmServers } from './realmServers';

export const factionEnum = pgEnum('faction', ['Alliance', 'Horde']);

export const characters = pgTable('characters', {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar('name', { length: 12 }).notNull(),
  faction: factionEnum().notNull(),
  class: varchar('class', { length: 32 }).notNull(),
  ownerId: uuid('owner_id')
    .references(() => users.id)
    .notNull(),
  realmServerId: uuid('realm_server_id')
    .references(() => realmServers.id)
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
