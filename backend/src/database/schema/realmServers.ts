import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const realmServers = pgTable('realm_servers', {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export default realmServers;
