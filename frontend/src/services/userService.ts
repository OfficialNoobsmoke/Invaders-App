import { apiRoutes } from '../constants/constants';
import { IUser } from '../interfaces/IUser';
import apiClient from '../utils/apiClient';
import { buildRouteUrl } from '../utils/urlBuildRouter';

export const getUser = async (): Promise<IUser> => {
  return (await apiClient.get(`${buildRouteUrl(apiRoutes.USER)}`)).data;
};
