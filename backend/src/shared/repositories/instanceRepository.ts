import { getDatabase } from '../../app/database/database';

export const getInstances = async () => {
  const db = await getDatabase();
  return await db.query.instances.findMany();
};
