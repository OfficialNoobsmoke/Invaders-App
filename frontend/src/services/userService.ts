import { apiRoutes } from '../constants/constants';
import { IUser } from '../interfaces/IUser';
import apiClient from '../utils/apiClient';
import { RouteBuilder } from '../utils/urlBuildRouter';

export const getUser = async (): Promise<IUser> => {
  const getUserRoute = new RouteBuilder().addRoute(apiRoutes.USER).build();
  return (await apiClient.get(getUserRoute)).data;
};
