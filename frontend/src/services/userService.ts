import { IUser } from '../interfaces/IUser';
import apiClient from '../utils/apiClient';

const getUsersUrlBuilder = () => {
  return `http://localhost:4000/api/users`;
};

export const getUsers = async (): Promise<IUser[]> => {
  return (await apiClient.get(getUsersUrlBuilder())).data;
};
