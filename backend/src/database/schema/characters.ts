import {
  numeric,
  pgEnum,
  pgTable,
  pgView,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { users } from './user';
import { realmServers } from './realmServers';
import { relations } from 'drizzle-orm';
import { charactersPreferredInstances } from './charactersPreferredInstances';
import { charactersSavedInstances } from './charactersSavedInstances';
import { characterSpecializations } from './characterSpecializations';

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
  createdAt: timestamp('created_at', { mode: 'date', withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const charactersRelations = relations(characters, ({ many }) => ({
  specializations: many(characterSpecializations),
  charactersPreferredInstances: many(charactersPreferredInstances),
  charactersSavedInstances: many(charactersSavedInstances),
}));

export const characterDetails = pgView('character_details', {
  id: uuid('id').notNull(),
  name: varchar('name', { length: 12 }).notNull(),
  faction: varchar('faction', { length: 10 }).notNull(),
  class: varchar('class', { length: 32 }).notNull(),
  ownerId: uuid('owner_id').notNull(),
  realmServerId: uuid('realm_server_id').notNull(),
  createdAt: timestamp('created_at', {
    mode: 'date',
    withTimezone: true,
  }).notNull(),
  specializationId: uuid('specialization_id'),
  specializationName: varchar('specialization_name', { length: 50 }),
  specializationGearScore: numeric('specialization_gear_score', {
    precision: 4,
    scale: 0,
  }),
  charactersPreferredInstances: uuid('characters_preferred_instances'),
  charactersSavedInstances: uuid('characters_saved_instances'),
}).existing();
