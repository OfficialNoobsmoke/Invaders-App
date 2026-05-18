import { relations } from 'drizzle-orm';
import {
  numeric,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { instancesRealmServers } from './instancesRealmServers';
import { charactersPreferredInstances } from '../../modules/character/database/charactersPreferredInstances';
import { charactersSavedInstances } from '../../modules/character/database/charactersSavedInstances';

export const instances = pgTable('instances', {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar('name', { length: 12 }).notNull(),
  label: varchar('label', { length: 50 }).notNull(),
  size: numeric({ precision: 2, scale: 0 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const instancesRelations = relations(instances, ({ many }) => ({
  realmServers: many(instancesRealmServers),
  charactersPreferredInstances: many(charactersPreferredInstances),
  charactersSavedInstances: many(charactersSavedInstances),
}));
