import { apiRoutes } from '../constants/constants';
import { ApplicationDataContextType } from '../types/applicationDataContextType';
import apiClient from '../utils/apiClient';
import { RouteBuilder } from '../utils/urlBuildRouter';

export const getApplicationData = async (): Promise<ApplicationDataContextType> => {
  const getApplicationDataRoute = new RouteBuilder().addRoute(apiRoutes.APPLICATION_DATA).build();
  return (await apiClient.get(getApplicationDataRoute)).data;
};
