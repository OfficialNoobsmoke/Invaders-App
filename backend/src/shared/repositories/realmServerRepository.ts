import { getDatabase } from '../../app/database/database';
import { NotFoundError } from '../exceptions/notFoundError';

export const getRealmServerById = async (realmServerId: string) => {
  const db = await getDatabase();
  const realmServer = await db.query.realmServers.findFirst({
    where: (realmServers, { eq }) => eq(realmServers.id, realmServerId),
  });

  if (!realmServer) throw new NotFoundError(['Realm server not found']);
  return realmServer;
};

export const getRealmServers = async () => {
  const db = await getDatabase();
  return await db.query.realmServers.findMany();
};
