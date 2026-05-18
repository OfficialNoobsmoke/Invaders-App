import { relations } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { instancesRealmServers } from './instancesRealmServers';
import { raidSessions } from '../../modules/raidSession/database/raidSessions';

export const realmServers = pgTable('realm_servers', {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const realmServersRelations = relations(realmServers, ({ many }) => ({
  instances: many(instancesRealmServers),
  raidSchedules: many(raidSessions),
}));
