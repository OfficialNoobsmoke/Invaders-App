import { eq } from 'drizzle-orm';
import { getDatabase } from '../../app/database/database';
import { raidInstances } from './database/raidInstances';
import { raidSessions } from './database/raidSessions';
import { CreateRaidInstance } from './interfaces/createRaidInstance';

export const createRaidSession = async (
  realmServerId: string,
  dateTime: Date,
  duration: number,
  instances: CreateRaidInstance[],
  locked: boolean
) => {
  const db = await getDatabase();
  return await db.transaction(async (tx) => {
    const [newScheduleId] = await tx
      .insert(raidSessions)
      .values({
        realmServerId,
        dateTime,
        duration,
        isLocked: locked,
        isActive: true,
      })
      .returning({ id: raidSessions.id });

    for (const instance of instances) {
      await tx.insert(raidInstances).values({
        raidSessionId: newScheduleId.id,
        instanceId: instance.instanceId,
        description: instance.description,
        faction: instance.faction,
      });
    }

    return newScheduleId;
  });
};

export const getRaidSessions = async () => {
  const db = await getDatabase();
  return await db
    .select()
    .from(raidSessions)
    .where(eq(raidSessions.isActive, true))
    .orderBy(raidSessions.dateTime);
};

export default { createRaidSession, getRaidSessions };
