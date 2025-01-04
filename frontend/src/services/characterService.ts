import { apiRoutes } from '../constants/constants';
import { ICharacter } from '../interfaces/ICharacter';
import { IPagination } from '../interfaces/IPagination';
import apiClient from '../utils/apiClient';
import { RouteBuilder } from '../utils/urlBuildRouter';

const getCharactersByUserIdRoute = (userId: string | undefined, page: number, pageSize: number) => {
  const routeBuilder = new RouteBuilder();
  return routeBuilder
    .addRoute(apiRoutes.CHARACTERS)
    .addOptionalParameter(userId)
    .addPaginationQueryParameters(page, pageSize)
    .build();
};

export const getCharactersByUserId = async (
  userId: string | undefined,
  page: number,
  pageSize: number,
  queryOptions: object
): Promise<IPagination<ICharacter[]>> => {
  const result = await apiClient.post(getCharactersByUserIdRoute(userId, page, pageSize), queryOptions);
  return result.data;
};

export const createCharacter = async (character: ICharacter) => {
  const result = await apiClient.post(apiRoutes.CHARACTERS, character);
  return result.data;
};
