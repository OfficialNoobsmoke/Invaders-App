import { Router } from 'express';
import userValidator from '../../modules/user/userValidator';
import characterValidator from '../../modules/character/characterValidator';
import { validationHandler } from '../middlewares/validationHandler';
import userController from '../../modules/user/userController';
import authorizationMiddleware from '../../modules/authentication/authMiddleware';
import {
  authenticate,
  callBack,
} from '../../modules/authentication/services/discordAuthenticationService';
import { saveAuthenticationData } from '../../modules/authentication/services/authenticationService';
import {
  authenticationFailure,
  checkAuthentication,
  logOut,
  refreshToken,
} from '../../modules/authentication/authenticationController';
import characterController from '../../modules/character/characterController';
import { getApplicationData } from '../../shared/controllers/applicationDataController';
import raidSessionController from '../../modules/raidSession/raidSessionController';

const router: Router = Router();

router.post('/auth/token', refreshToken);
router.get('/auth/check', authorizationMiddleware, checkAuthentication);
router.post('/auth/logout', logOut);
router.get('/auth/discord', authenticate());
router.get('/auth/discord/callback', callBack(), saveAuthenticationData);
router.get('/auth/failure', authenticationFailure);

router.post(
  '/user',
  authorizationMiddleware,
  userValidator.createUser,
  validationHandler,
  userController.createUser
);
router.get('/users', authorizationMiddleware, userController.getUsers);
router.get('/user/me', authorizationMiddleware, userController.getUser);
router.delete(
  '/user/:id',
  authorizationMiddleware,
  userValidator.deleteUser,
  validationHandler,
  userController.deleteUser
);

router.post(
  '/characters{/:userId}',
  authorizationMiddleware,
  characterController.getCharactersByUserId
);
router.post(
  '/character',
  authorizationMiddleware,
  characterValidator.createCharacter,
  characterController.createCharacter
);
router.get(
  '/character/{:characterName}/{:realmServerId}/external',
  authorizationMiddleware,
  characterController.getCharacterFromExternalSource
);

router.get('/applicationData', getApplicationData);

router.post(
  '/raid-session',
  authorizationMiddleware,
  raidSessionController.createRaidSession
);
router.get(
  '/raid-sessions',
  authorizationMiddleware,
  raidSessionController.getRaidSessions
);

export const routes: Router = router;
