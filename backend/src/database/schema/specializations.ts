import {
  numeric,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { characters } from './characters';

export const specializations = pgTable('specializations', {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  gearScore: numeric({ precision: 4, scale: 0 }).notNull(),
  characterId: uuid('character_id').references(() => characters.id),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
