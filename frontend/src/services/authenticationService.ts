import { apiRoutes } from '../constants/constants';
import apiClient from '../utils/apiClient';
import { RouteBuilder } from '../utils/urlBuildRouter';

export const logout = async () => {
  const logoutRoute = new RouteBuilder().addRoute(apiRoutes.LOGOUT).build();
  await apiClient.post(logoutRoute);
};

export const check = async (): Promise<boolean> => {
  try {
    const checkRoute = new RouteBuilder().addRoute(apiRoutes.CHECK).build();
    await apiClient.get(checkRoute);
    return true;
  } catch (error) {
    return false;
  }
};
