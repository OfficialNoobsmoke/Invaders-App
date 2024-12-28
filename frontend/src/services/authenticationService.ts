import apiClient from '../utils/apiClient';

const logoutUrlBuilder = () => {
  return `http://localhost:4000/api/auth/logout`;
};

export const logout = async () => {
  await apiClient.post(logoutUrlBuilder());
};
