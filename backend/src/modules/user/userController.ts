import { Request, Response } from 'express';
import * as userService from './userService';

export const createUser = async (req: Request, res: Response) => {
  const { discordId, username, displayName, email, profileImageUrl } = req.body;

  const newUser = await userService.createUser(
    discordId,
    username,
    displayName,
    email,
    profileImageUrl
  );
  res.status(201).json(newUser);
};

export const getUser = async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.user.id);

  res.status(200).json(user);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await userService.getUserById(id);

  res.status(200).json(user);
};

export const getUserByUsername = async (req: Request, res: Response) => {
  const { username } = req.params;

  const user = await userService.getUserByUsername(username);

  res.status(200).json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { displayName, email } = req.body;

  const updatedUser = await userService.updateUser(id, {
    displayName,
    email,
  });

  res.status(200).json(updatedUser);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  await userService.deleteUser(id);

  res.status(204).send();
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await userService.getUsers();

  res.status(200).json(users);
};

export default {
  createUser,
  getUserById,
  getUserByUsername,
  updateUser,
  deleteUser,
  getUsers,
  getUser,
};
