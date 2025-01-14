import { Request, Response } from 'express';
import { HttpStatusCode } from 'axios';
import applicationDataService from '../services/applicationDataService';

export const getApplicationData = async (req: Request, res: Response) => {
  const applicationData = await applicationDataService.getApplicationData();

  res.status(HttpStatusCode.Ok).json(applicationData);
};
