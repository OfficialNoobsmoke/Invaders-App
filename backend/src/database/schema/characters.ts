//import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { users } from './user';
//import realmServers from './realmServers';

export const factionEnum = pgEnum('faction', ['Alliance', 'Horde']);

export const characters = pgTable('characters', {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar('name', { length: 12 }).notNull(),
  faction: factionEnum().notNull(),
  class: varchar('displayname', { length: 32 }),
  ownerId: uuid('owner_id')
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// export const charactersRelations = relations(characters, ({ many }) => ({
//   realmServers: many(realmServers),
// }));
