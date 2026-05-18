import { CreateRaidInstance } from './interfaces/createRaidInstance';
import raidSessionRepository from './raidSessionRepository';

export const createRaidSession = async (
  realmServerId: string,
  dateTime: Date,
  duration: number,
  instances: CreateRaidInstance[],
  locked: boolean
) => {
  raidSessionRepository.createRaidSession(
    realmServerId,
    dateTime,
    duration,
    instances,
    locked
  );
};

export const getRaidSessions = async () => {
  return raidSessionRepository.getRaidSessions();
};

export default { createRaidSession, getRaidSessions };
