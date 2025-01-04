import axios from 'axios';
import { RouteBuilder } from './urlBuildRouter';

const apiClient = axios.create({
  baseURL: RouteBuilder.baseUrl,
  withCredentials: true,
});

export default apiClient;
