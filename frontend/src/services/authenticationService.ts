import { apiRoutes } from '../constants/constants';
import apiClient from '../utils/apiClient';
import { buildRouteUrl } from '../utils/urlBuildRouter';

export const logout = async () => {
  await apiClient.post(`${buildRouteUrl(apiRoutes.LOGOUT)}`);
};

export const check = async (): Promise<boolean> => {
  try {
    await apiClient.get(`${buildRouteUrl(apiRoutes.CHECK)}`);
    return true;
  } catch (error) {
    return false;
  }
};
