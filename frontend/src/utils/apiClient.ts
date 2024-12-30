import axios from 'axios';
import { buildRouteUrl } from './urlBuildRouter';

const apiClient = axios.create({
  baseURL: buildRouteUrl(''),
  withCredentials: true,
});

export default apiClient;
