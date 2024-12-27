import { Router } from 'express';
import userValidator from '../validators/userValidator';
import { validationHandler } from '../middlewares/validationHandler';
import userController from '../controllers/userController';
import asyncHandler from '../middlewares/asyncHandler';
import authorizationMiddleware from '../middlewares/authMiddleware';
import {
  authenticate,
  callBack,
  logOut,
} from '../services/discordAuthenticationService';
import { saveAuthenticationData } from '../services/authenticationService';
import { refreshToken } from '../controllers/tokenController';

const router: Router = Router();

router.post('/auth/token', asyncHandler(refreshToken));
router.post('/auth/logout', asyncHandler(logOut));

router.get('/auth/discord', authenticate());

router.get(
  '/auth/discord/callback',
  callBack(),
  asyncHandler(saveAuthenticationData)
);

router.post(
  '/user',
  authorizationMiddleware,
  userValidator.createUser,
  validationHandler,
  asyncHandler(userController.createUser)
);
router.delete(
  '/user/:id',
  authorizationMiddleware,
  userValidator.deleteUser,
  validationHandler,
  asyncHandler(userController.deleteUser)
);

export const routes: Router = router;
