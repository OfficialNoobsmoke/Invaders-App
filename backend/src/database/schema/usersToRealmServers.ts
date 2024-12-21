import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { users } from './user';
import realmServers from './realmServers';

export const usersToRealmServers = pgTable('users_to_realm_servers', {
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  realmServerId: uuid('realm_server_id')
    .notNull()
    .references(() => realmServers.id),
});
