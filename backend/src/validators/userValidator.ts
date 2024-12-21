import { body, param } from 'express-validator';
import * as userRepository from '../repositories/userRepository';

export const createUserValidator = [
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
];

export const updateUserValidator = [
  param('id').isUUID().withMessage('Invalid user ID'),
  body('displayName')
    .optional()
    .isString()
    .withMessage('Display name must be a string')
    .isLength({ max: 32 })
    .withMessage('Display name cannot exceed 32 characters'),
  body('email').optional().isEmail().withMessage('Invalid email format'),
];

export const getUserByIdValidator = [
  param('id').isUUID().withMessage('Invalid user ID'),
];

export const getUserByUsernameValidator = [
  param('username')
    .isString()
    .withMessage('Username must be a string')
    .isLength({ min: 3, max: 32 })
    .withMessage('Username must be between 3 and 32 characters'),
];

export const deleteUserValidator = [
  param('id')
    .isUUID()
    .withMessage('Invalid user ID')
    .custom(async (id) => {
      const user = await userRepository.getUserById(id);
      if (!user) {
        throw new Error('User not found');
      }
    }),
];
