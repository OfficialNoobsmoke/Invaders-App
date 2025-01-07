import { Router } from 'express';
import userValidator from '../validators/userValidator';
import { validationHandler } from '../middlewares/validationHandler';
import userController from '../controllers/userController';
import authorizationMiddleware from '../middlewares/authMiddleware';
import {
  authenticate,
  callBack,
} from '../services/discordAuthenticationService';
import { saveAuthenticationData } from '../services/authenticationService';
import {
  authenticationFailure,
  checkAuthentication,
  logOut,
  refreshToken,
} from '../controllers/authenticationController';
import characterController from '../controllers/characterController';

const router: Router = Router();

router.post('/auth/token', refreshToken);
router.get('/auth/check', checkAuthentication);
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
  characterController.createCharacter
);

export const routes: Router = router;
