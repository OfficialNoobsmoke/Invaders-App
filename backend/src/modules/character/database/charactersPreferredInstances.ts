import { pgTable, uuid, primaryKey } from 'drizzle-orm/pg-core';
import { characters } from './characters';
import { instances } from '../../../app/database/schema/instances';
import { relations } from 'drizzle-orm';

export const charactersPreferredInstances = pgTable(
  'characters_preferred_instances',
  {
    characterId: uuid('character_id')
      .notNull()
      .references(() => characters.id),
    instanceId: uuid('instance_id')
      .notNull()
      .references(() => instances.id),
  },
  (table) => ({
    compositePk: primaryKey({
      columns: [table.characterId, table.instanceId],
    }),
  })
);

export const preferredInstancesRelations = relations(
  charactersPreferredInstances,
  ({ one }) => ({
    character: one(characters, {
      fields: [charactersPreferredInstances.characterId],
      references: [characters.id],
    }),
    instance: one(instances, {
      fields: [charactersPreferredInstances.instanceId],
      references: [instances.id],
    }),
  })
);
