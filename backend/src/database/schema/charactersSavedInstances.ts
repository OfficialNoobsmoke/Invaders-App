import { pgTable, uuid, primaryKey } from 'drizzle-orm/pg-core';
import { characters } from './characters';
import { instances } from './instances';
import { relations } from 'drizzle-orm';

export const charactersSavedInstances = pgTable(
  'characters_saved_instances',
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

export const charactersSavedInstancesRelations = relations(
  charactersSavedInstances,
  ({ one }) => ({
    character: one(characters, {
      fields: [charactersSavedInstances.characterId],
      references: [characters.id],
    }),
    instance: one(instances, {
      fields: [charactersSavedInstances.instanceId],
      references: [instances.id],
    }),
  })
);
