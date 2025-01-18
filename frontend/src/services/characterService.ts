import { apiRoutes } from '../constants/constants';
import { CreateCharacter } from '../dto/createCharacter';
import { ReadCharacter } from '../dto/readCharacter';
import { Pagination } from '../interfaces/pagination';
import apiClient from '../utils/apiClient';
import { RouteBuilder } from '../utils/urlBuildRouter';

const getCharactersByUserIdRoute = (userId: string, page: number, limit: number) => {
  const routeBuilder = new RouteBuilder();
  return routeBuilder
    .addRoute(apiRoutes.CHARACTERS)
    .addParameter(userId)
    .addPaginationQueryParameters(page, limit)
    .build();
};

export const getCharactersByUserId = async (
  userId: string,
  page: number,
  limit: number,
  queryOptions: object
): Promise<Pagination<ReadCharacter[]>> => {
  const result = await apiClient.post(getCharactersByUserIdRoute(userId, page, limit), queryOptions);
  return result.data;
};

export const createCharacter = async (character: CreateCharacter) => {
  const result = await apiClient.post(apiRoutes.CHARACTER, character);
  return result.data;
};
