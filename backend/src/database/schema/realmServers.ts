//import { relations } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
//import { usersToRealmServers } from './usersToRealmServers';

export const realmServers = pgTable('realm_servers', {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// export const realmServersRelations = relations(realmServers, ({ many }) => ({
//   usersToRealmServers: many(usersToRealmServers),
// }));

export default realmServers;
