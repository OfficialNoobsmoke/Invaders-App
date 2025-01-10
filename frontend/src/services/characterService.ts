import { apiRoutes } from '../constants/constants';
import { CreateCharacter, ReadCharacter } from '../dto/characterDto';
import { Pagination } from '../interfaces/pagination';
import apiClient from '../utils/apiClient';
import { RouteBuilder } from '../utils/urlBuildRouter';

const getCharactersByUserIdRoute = (userId: string, page: number, pageSize: number) => {
  const routeBuilder = new RouteBuilder();
  return routeBuilder
    .addRoute(apiRoutes.CHARACTERS)
    .addParameter(userId)
    .addPaginationQueryParameters(page, pageSize)
    .build();
};

export const getCharactersByUserId = async (
  userId: string,
  page: number,
  pageSize: number,
  queryOptions: object
): Promise<Pagination<ReadCharacter[]>> => {
  const result = await apiClient.post(getCharactersByUserIdRoute(userId, page, pageSize), queryOptions);
  return result.data;
};

export const createCharacter = async (character: CreateCharacter) => {
  const result = await apiClient.post(apiRoutes.CHARACTER, character);
  return result.data;
};
