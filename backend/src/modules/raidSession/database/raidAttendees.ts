import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { characters } from '../../../app/database/schema';
import { raidInstances } from './raidInstances';
import { relations } from 'drizzle-orm';

export const raidAttendees = pgTable('raid_attendees', {
  id: uuid().defaultRandom().primaryKey(),
  raidInstanceId: uuid('raid_instance_id')
    .references(() => raidInstances.id)
    .notNull(),
  characterId: uuid('character_id')
    .references(() => characters.id)
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date', withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const raidAttendeesRelations = relations(raidAttendees, ({ one }) => ({
  raidInstance: one(raidInstances, {
    fields: [raidAttendees.raidInstanceId],
    references: [raidInstances.id],
  }),
}));
