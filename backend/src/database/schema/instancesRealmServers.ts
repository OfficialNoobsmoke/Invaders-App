import { pgTable, uuid, primaryKey } from 'drizzle-orm/pg-core';
import { instances } from './instances';
import { realmServers } from './realmServers';
import { relations } from 'drizzle-orm';

export const instancesRealmServers = pgTable(
  'instances_realm_servers',
  {
    instanceId: uuid('instance_id')
      .notNull()
      .references(() => instances.id),
    realmServerId: uuid('realm_server_id')
      .notNull()
      .references(() => realmServers.id),
  },
  (table) => ({
    compositePk: primaryKey({
      columns: [table.instanceId, table.realmServerId],
    }),
  })
);

export const instancesRealmServersRelations = relations(
  instancesRealmServers,
  ({ one }) => ({
    instance: one(instances, {
      fields: [instancesRealmServers.instanceId],
      references: [instances.id],
    }),
    realmServer: one(realmServers, {
      fields: [instancesRealmServers.realmServerId],
      references: [realmServers.id],
    }),
  })
);
