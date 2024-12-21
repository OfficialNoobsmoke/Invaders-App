import { getDatabase } from './database';
import { realmServers } from './schema';

export const seedDatabase = async () => {
  const db = await getDatabase();
  await db
    .insert(realmServers)
    .values({
      id: 'a1e0b3b5-1b86-4eb6-92b3-5bed64b35619',
      name: 'Warmane-Icecrown',
    })
    .onConflictDoNothing();
  await db
    .insert(realmServers)
    .values({
      id: 'f1e0b3b5-1b86-4eb6-92b3-5bed64b35619',
      name: 'Warmane-Lordaeron',
    })
    .onConflictDoNothing();
};
