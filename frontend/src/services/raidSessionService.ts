import { apiRoutes } from '../constants/constants';
import { CreateCharacter } from '../dto/createCharacter';
import { ReadRaidSession } from '../dto/readRaidSession';
import apiClient from '../utils/apiClient';
import { RouteBuilder } from '../utils/urlBuildRouter';

const getRaidSessionsRoute = () => {
  const routeBuilder = new RouteBuilder();
  return routeBuilder.addRoute(apiRoutes.RAID_SESSIONS).build();
};

export const getRaidSessions = async (): Promise<ReadRaidSession[]> => {
  const result = await apiClient.get(getRaidSessionsRoute());
  return result.data;
};

export const createCharacter = async (character: CreateCharacter) => {
  const result = await apiClient.post(apiRoutes.CHARACTER, character);
  return result.data;
};
