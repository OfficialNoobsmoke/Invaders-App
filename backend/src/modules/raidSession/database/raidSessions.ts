import {
  boolean,
  pgTable,
  smallint,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { realmServers } from '../../../app/database/schema';
import { relations } from 'drizzle-orm';
import { raidSignUps } from './raidSignUps';

export const raidSessions = pgTable('raid_sessions', {
  id: uuid().defaultRandom().primaryKey(),
  realmServerId: uuid('realm_server_id')
    .references(() => realmServers.id)
    .notNull(),
  dateTime: timestamp('date_time', {
    mode: 'date',
    withTimezone: true,
  }).notNull(),
  duration: smallint('duration').notNull(),
  isLocked: boolean('is_locked').notNull(),
  isActive: boolean('is_active').notNull(),
  createdAt: timestamp('created_at', { mode: 'date', withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const raidSessionsRelations = relations(
  raidSessions,
  ({ one, many }) => ({
    realmServer: one(realmServers, {
      fields: [raidSessions.realmServerId],
      references: [realmServers.id],
    }),
    raidSignUps: many(raidSignUps),
  })
);
