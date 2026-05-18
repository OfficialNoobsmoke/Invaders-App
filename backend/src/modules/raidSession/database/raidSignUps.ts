import {
  pgTable,
  smallint,
  time,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { users } from '../../../app/database/schema';
import { raidSessions } from './raidSessions';
import { relations } from 'drizzle-orm';

export const raidSignUps = pgTable('raid_sign_ups', {
  id: uuid().defaultRandom().primaryKey(),
  raidScheduleId: uuid('raid_schedule_id')
    .references(() => raidSessions.id)
    .notNull(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  canAttendFor: smallint('can_attend_for').notNull(),
  canLogAt: time('can_log_at').notNull(),
  preferredFaction: varchar('faction', { length: 32 }).notNull(),
  createdAt: timestamp('created_at', { mode: 'date', withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const raidSignUpsRelations = relations(raidSignUps, ({ one }) => ({
  raidSchedule: one(raidSessions, {
    fields: [raidSignUps.raidScheduleId],
    references: [raidSessions.id],
  }),
}));
