import { Request, Response } from 'express';
import * as userRepository from '../repositories/userRepository';

export const createUser = async (req: Request, res: Response) => {
  const { discordId, username, displayName, email } = req.body;

  const newUser = await userRepository.createUser({
    discordId,
    username,
    displayName,
    email,
  });

  res.status(201).json(newUser);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await userRepository.getUserById(id);

  res.status(200).json(user);
};

export const getUserByUsername = async (req: Request, res: Response) => {
  const { username } = req.params;

  const user = await userRepository.getUserByUsername(username);

  res.status(200).json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { displayName, email } = req.body;

  const updatedUser = await userRepository.updateUser(id, {
    displayName,
    email,
  });

  res.status(200).json(updatedUser);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  await userRepository.deleteUser(id);

  res.status(204);
};

export const getUsers = async (_req: Request, res: Response) => {
  const users = await userRepository.getUsers();

  res.status(200).json(users);
};

export default {
  createUser,
  getUserById,
  getUserByUsername,
  updateUser,
  deleteUser,
  getUsers,
};
