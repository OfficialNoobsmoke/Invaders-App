import { body, param } from 'express-validator';

export const createCharacter = [
  body('name').notEmpty().withMessage('Name is required'),
  body('faction')
    .isIn(['Alliance', 'Horde'])
    .withMessage('Faction must be either "Alliance" or "Horde"'),
  body('characterClass').notEmpty().withMessage('Character class is required'),
  body('ownerId').isUUID().withMessage('Owner ID must be a valid UUID'),
  body('realmServerId')
    .isUUID()
    .withMessage('Realm Server ID must be a valid UUID'),
];

export const updateCharacter = [
  param('id').isUUID().withMessage('Character ID must be a valid UUID'),

  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('faction')
    .optional()
    .isIn(['Alliance', 'Horde'])
    .withMessage('Faction must be either "Alliance" or "Horde"'),
  body('characterClass')
    .optional()
    .notEmpty()
    .withMessage('Character class cannot be empty'),
];

export const deleteCharacter = [
  param('id').isUUID().withMessage('Character ID must be a valid UUID'),
];

export const getCharactersByUserId = [
  param('ownerId').isUUID().withMessage('Owner ID must be a valid UUID'),
];
