import { apiRoutes } from '../constants/constants';
import { User } from '../interfaces/user';
import apiClient from '../utils/apiClient';
import { RouteBuilder } from '../utils/urlBuildRouter';

export const getUser = async (): Promise<User> => {
  const getUserRoute = new RouteBuilder().addRoute(apiRoutes.USER).build();
  return (await apiClient.get(getUserRoute)).data;
};
