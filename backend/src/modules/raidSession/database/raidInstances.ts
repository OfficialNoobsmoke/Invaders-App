import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { instances } from '../../../app/database/schema';
import { relations } from 'drizzle-orm';
import { raidAttendees } from './raidAttendees';

export const raidInstances = pgTable('raid_instances', {
  id: uuid().defaultRandom().primaryKey(),
  raidSessionId: uuid('raid_session_id')
    .references(() => instances.id)
    .notNull(),
  instanceId: uuid('instance_id')
    .references(() => instances.id)
    .notNull(),
  faction: varchar('faction', { length: 32 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { mode: 'date', withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const raidInstancesRelations = relations(raidInstances, ({ many }) => ({
  raidAttendees: many(raidAttendees),
}));
