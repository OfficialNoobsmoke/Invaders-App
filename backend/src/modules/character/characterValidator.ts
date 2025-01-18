import { body, param } from 'express-validator';
import { getRealmServerById } from '../../shared/repositories/realmServerRepository';
import { Class } from './interfaces/class';
import { Specialization } from './interfaces/createCharacter';
import { Specialization as AvailableSpecialization } from './interfaces/specialization';
import { getInstances } from '../../shared/repositories/instanceRepository';
import characterService from './characterService';

export const createCharacter = [
  body('realmServerId')
    .isUUID()
    .withMessage('Realm Server ID must be a valid UUID')
    .notEmpty()
    .withMessage('Realm Server ID is required')
    .custom(async (realmServerId: string) => {
      const realmServer = await getRealmServerById(realmServerId);
      if (!realmServer) {
        return 'Realm Server not found';
      }
    }),
  body('name')
    .isString()
    .isLength({ min: 3, max: 12 })
    .matches(/^[a-zA-Z]+$/)
    .withMessage(
      'Character name must contain only alphabetic characters (A-Z or a-z)'
    )
    .custom(async (name: string, { req }) => {
      if (name.charAt(0) !== name.charAt(0).toUpperCase()) {
        return 'Name must start with a capital letter';
      }
      if (
        await characterService.getCharacterByNameAndRealm(
          name,
          req.body.realmServerId
        )
      ) {
        return 'Character name is already in use';
      }
    }),
  body('faction')
    .notEmpty()
    .isIn(['Alliance', 'Horde'])
    .withMessage('Faction must be either "Alliance" or "Horde"'),
  body('class')
    .notEmpty()
    .withMessage('Character class is required')
    .isIn(Object.values(Class))
    .withMessage(
      `Character class must be one of the following: ${Object.values(Class).join(', ')}`
    ),
  body('specializations')
    .isArray({ min: 1 })
    .custom((specializations: Specialization[]) => {
      specializations.forEach((specialization) => {
        if (specialization.gearScore < 0 || specialization.gearScore > 6992) {
          return 'Gear score must be between 0 and 6992';
        }
        if (
          !Object.values(AvailableSpecialization).some(
            (x) => x === specialization.name
          )
        ) {
          return `Specialization must be one of the following: ${Object.values(AvailableSpecialization).join(', ')}`;
        }
      });
    }),
  body('charactersPreferredInstances')
    .isArray()
    .withMessage('Characters preferred instances must be an array')
    .custom(async (charactersPreferredInstances: string[]) => {
      const instances = await getInstances();
      charactersPreferredInstances.forEach((instanceId) => {
        if (!instances.some((instance) => instance.id === instanceId)) {
          return `Instance with ID ${instanceId} does not exist`;
        }
      });
    }),
  body('charactersSavedInstances')
    .isArray()
    .withMessage('Characters saved instances must be an array')
    .custom(async (charactersSavedInstances: string[]) => {
      const instances = await getInstances();
      charactersSavedInstances.forEach((instanceId) => {
        if (!instances.some((instance) => instance.id === instanceId)) {
          return `Instance with ID ${instanceId} does not exist`;
        }
      });
    }),
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

export default {
  createCharacter,
  updateCharacter,
  deleteCharacter,
  getCharactersByUserId,
};
