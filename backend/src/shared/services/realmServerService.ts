import {
  getRealmServerById,
  getRealmServers,
} from '../repositories/realmServerRepository';

export const fetchRealmServerById = async (realmServerId: string) => {
  return await getRealmServerById(realmServerId);
};

export const fetchRealmServers = async () => {
  return await getRealmServers();
};
