import { body, param } from 'express-validator';
import * as userRepository from './userRepository';

export const createUser = [
  body('username')
    .isString()
    .withMessage('Username must be a string')
    .isLength({ min: 3, max: 32 })
    .withMessage('Username must be between 3 and 32 characters long'),
  body('displayName')
    .optional()
    .isString()
    .withMessage('Display name must be a string')
    .isLength({ max: 32 })
    .withMessage('Display name cannot exceed 32 characters'),
  body('email').optional().isEmail().withMessage('Invalid email format'),
  body('discordId')
    .isString()
    .withMessage('Discord ID must be a string')
    .isLength({ min: 17, max: 18 })
    .withMessage('Discord ID must be between 17-18 characters long')
    .custom(async (discordId: string) => {
      const user = await userRepository.getUserByDiscordId(discordId);
      if (user) {
        throw new Error('Discord ID already in use');
      }
    }),
];

export const updateUser = [
  param('id').isUUID().withMessage('Invalid user ID'),
  body('displayName')
    .optional()
    .isString()
    .withMessage('Display name must be a string')
    .isLength({ max: 32 })
    .withMessage('Display name cannot exceed 32 characters'),
  body('email').optional().isEmail().withMessage('Invalid email format'),
];

export const getUserById = [
  param('id').isUUID().withMessage('Invalid user ID'),
];

export const getUserByUsername = [
  param('username')
    .isString()
    .withMessage('Username must be a string')
    .isLength({ min: 3, max: 32 })
    .withMessage('Username must be between 3 and 32 characters'),
];

export const deleteUser = [
  param('id')
    .isUUID()
    .withMessage('Invalid user ID')
    .custom(async (id: string) => {
      const user = await userRepository.getUserById(id);
      if (!user) {
        throw new Error('User not found');
      }
    }),
];

export default {
  createUser,
  updateUser,
  getUserById,
  getUserByUsername,
  deleteUser,
};
