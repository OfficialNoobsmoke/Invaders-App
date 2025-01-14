import { HttpStatusCode } from 'axios';
import { getDatabase } from '../../app/database/database';
import { HTTPError } from '../exceptions/httpError';

export const getRealmServerById = async (realmServerId: string) => {
  const db = await getDatabase();
  const realmServer = await db.query.realmServers.findFirst({
    where: (realmServers, { eq }) => eq(realmServers.id, realmServerId),
  });

  if (!realmServer)
    throw new HTTPError('Realm server not found', HttpStatusCode.NotFound);
  return realmServer;
};

export const getRealmServers = async () => {
  const db = await getDatabase();
  return await db.query.realmServers.findMany();
};
