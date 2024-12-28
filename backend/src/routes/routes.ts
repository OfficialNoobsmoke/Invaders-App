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
import { logOut, refreshToken } from '../controllers/authenticationController';

const router: Router = Router();

router.post('/auth/token', refreshToken);
router.post('/auth/logout', logOut);
router.get('/auth/discord', authenticate());
router.get('/auth/discord/callback', callBack(), saveAuthenticationData);
router.post(
  '/user',
  authorizationMiddleware,
  userValidator.createUser,
  validationHandler,
  userController.createUser
);
router.get('/users', authorizationMiddleware, userController.getUsers);
router.delete(
  '/user/:id',
  authorizationMiddleware,
  userValidator.deleteUser,
  validationHandler,
  userController.deleteUser
);

export const routes: Router = router;
