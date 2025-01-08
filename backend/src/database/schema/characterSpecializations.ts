import {
  numeric,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { characters } from './characters';
import { relations } from 'drizzle-orm';

export const characterSpecializations = pgTable('character_specializations', {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  gearScore: numeric('gear_score', { precision: 4, scale: 0 }).notNull(),
  characterId: uuid('character_id').references(() => characters.id),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const specializationsRelations = relations(
  characterSpecializations,
  ({ one }) => ({
    character: one(characters, {
      fields: [characterSpecializations.characterId],
      references: [characters.id],
    }),
  })
);
