import { validationResult } from 'express-validator';
import { ValidationError } from '../../shared/exceptions/validationError';
import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import raidSessionService from './raidSessionService';

export const createRaidSession = async (req: Request, res: Response) => {
  const { realmServerId, dateTime, duration, instances, locked } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError(errors.array().map((error) => error.msg));
  }

  const newRaidSession = await raidSessionService.createRaidSession(
    realmServerId,
    dateTime,
    duration,
    instances,
    locked
  );

  res.status(HttpStatusCode.Created).json(newRaidSession);
};

export const getRaidSessions = async (req: Request, res: Response) => {
  res.status(HttpStatusCode.Ok).json({
    id: '1',
    realmServerId: '1',
    dateTime: '1',
    duration: '1',
    isLocked: '1',
    isActive: '1',
    createdAt: '1',
  });

  const raidSessions = await raidSessionService.getRaidSessions();

  res.status(HttpStatusCode.Ok).json(raidSessions);
};

export default { createRaidSession, getRaidSessions };
