import { getInstances } from '../repositories/instanceRepository';
import { getRealmServers } from '../repositories/realmServerRepository';

export const getApplicationData = async () => {
  const realmServers = await getRealmServers();
  const instances = await getInstances();

  return {
    dropdowns: {
      realmServers: realmServers.map((realmServer) => ({
        label: realmServer.name,
        value: realmServer.id,
      })),
      instances: instances.map((instance) => ({
        label: `${instance.label} ${instance.size}`,
        value: instance.id,
      })),
    },
  };
};

export default { getApplicationData };
