import { Request, Response } from 'express';
import * as userRepository from '../repositories/userRepository';

// Create a new user
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
  if (!updatedUser) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json(updatedUser);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedUser = await userRepository.deleteUser(id);
  if (!deletedUser) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json(deletedUser);
};

export const listUsers = async (_req: Request, res: Response) => {
  const users = await userRepository.listUsers();

  res.status(200).json(users);
};
