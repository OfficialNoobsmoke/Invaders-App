import * as userRepository from '../repositories/userRepository';

export const createUser = async (
  discordId: string,
  username: string,
  displayName: string,
  email: string,
  profileImageUrl: string
) => {
  return userRepository.createUser({
    discordId,
    username,
    displayName,
    email,
    profileImageUrl,
  });
};

export const getUserById = async (id: string) => {
  return userRepository.getUserById(id);
};

export const getUserByUsername = async (username: string) => {
  return userRepository.getUserByUsername(username);
};

export const updateUser = async (
  id: string,
  updatedData: Partial<{ displayName: string; email: string }>
) => {
  return userRepository.updateUser(id, updatedData);
};

export const deleteUser = async (id: string) => {
  return userRepository.deleteUser(id);
};

export const getUsers = async () => {
  return userRepository.getUsers();
};
