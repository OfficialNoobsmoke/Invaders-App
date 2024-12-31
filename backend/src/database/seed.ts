import { getDatabase } from './database';
import { instances, realmServers } from './schema';
import { instancesRealmServers } from './schema/instancesRealmServers';

export const seedDatabase = async () => {
  const db = await getDatabase();

  // Insert realm servers
  const realmServersIds = await Promise.all(
    [
      db
        .insert(realmServers)
        .values({
          id: 'a1e0b3b5-1b86-4eb6-92b3-5bed64b35619',
          name: 'Warmane-Icecrown',
        })
        .onConflictDoNothing()
        .returning({ id: realmServers.id }),
      db
        .insert(realmServers)
        .values({
          id: 'f1e0b3b5-1b86-4eb6-92b3-5bed64b35619',
          name: 'Warmane-Lordaeron',
        })
        .onConflictDoNothing()
        .returning({ id: realmServers.id }),
    ].map((promise) => promise.then((result) => result[0].id))
  );

  // Insert instances
  const instanceIds = await Promise.all(
    [
      db
        .insert(instances)
        .values({
          id: '416e8f9c-f124-449f-ab4b-e88bd94eb263',
          name: 'ICC',
          label: 'Icecrown Citadel',
          size: '10',
        })
        .onConflictDoNothing()
        .returning({ id: instances.id }),
      db
        .insert(instances)
        .values({
          id: '673959db-e736-457c-bc7b-753f9972d977',
          name: 'ICC',
          label: 'Icecrown Citadel',
          size: '25',
        })
        .onConflictDoNothing()
        .returning({ id: instances.id }),
      db
        .insert(instances)
        .values({
          id: '9e2e8d17-51c8-4ab6-8613-5d60e1dbb977',
          name: 'RS',
          label: 'Ruby Sanctum',
          size: '10',
        })
        .onConflictDoNothing()
        .returning({ id: instances.id }),
      db
        .insert(instances)
        .values({
          id: 'c90c8646-24a4-4e57-b686-7e57d3875413',
          name: 'RS',
          label: 'Ruby Sanctum',
          size: '25',
        })
        .onConflictDoNothing()
        .returning({ id: instances.id }),
      db
        .insert(instances)
        .values({
          id: 'bf71ff7b-fb9a-40bd-9273-154369c674bd',
          name: 'ToGC',
          label: 'Trial of the Grand Crusader',
          size: '10',
        })
        .onConflictDoNothing()
        .returning({ id: instances.id }),
      db
        .insert(instances)
        .values({
          id: '6328a2a7-85cb-4658-a8dc-de517cc63efa',
          name: 'ToGC',
          label: 'Trial of the Grand Crusader',
          size: '25',
        })
        .onConflictDoNothing()
        .returning({ id: instances.id }),
    ].map((promise) => promise.then((result) => result[0].id))
  );

  const combinations = realmServersIds.flatMap((realmServerId) =>
    instanceIds.map((instanceId) => ({ realmServerId, instanceId }))
  );

  await db
    .insert(instancesRealmServers)
    .values(combinations)
    .onConflictDoNothing();
};
