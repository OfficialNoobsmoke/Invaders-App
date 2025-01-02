import { apiRoutes } from '../constants/constants';
import { ICharacter } from '../interfaces/ICharacter';
import { IPagination } from '../interfaces/IPagination';
import apiClient from '../utils/apiClient';
import { buildRouteUrlWithFilter } from '../utils/urlBuildRouter';

export const getCharactersByUserId = async (
  page: number,
  pageSize: number,
  userId: string | undefined
): Promise<IPagination<ICharacter[]>> => {
  const result = await apiClient.get(buildRouteUrlWithFilter(`${apiRoutes.CHARACTERS}/`, page, pageSize));
  return result.data;
};

export const createCharacter = async (character: ICharacter) => {
  const result = await apiClient.post(apiRoutes.CHARACTERS, character);
  return result.data;
};
