import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { users } from '../../user/database/user';
import { realmServers } from '../../../shared/database/realmServers';
import { relations } from 'drizzle-orm';
import { charactersPreferredInstances } from './charactersPreferredInstances';
import { charactersSavedInstances } from './charactersSavedInstances';
import { characterSpecializations } from './characterSpecializations';

export const characters = pgTable('characters', {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar('name', { length: 12 }).notNull(),
  faction: varchar('faction', { length: 32 }).notNull(),
  class: varchar('class', { length: 32 }).notNull(),
  ownerId: uuid('owner_id')
    .references(() => users.id)
    .notNull(),
  realmServerId: uuid('realm_server_id')
    .references(() => realmServers.id)
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date', withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const charactersRelations = relations(characters, ({ many }) => ({
  specializations: many(characterSpecializations),
  charactersPreferredInstances: many(charactersPreferredInstances),
  charactersSavedInstances: many(charactersSavedInstances),
}));
