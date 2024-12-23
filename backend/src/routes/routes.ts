import { Router } from 'express';
import userValidator from '../validators/userValidator';
import { validationHandler } from '../middlewares/validationHandler';
import userController from '../controllers/userController';
import asyncHandler from '../middlewares/asyncHandler';
import { authenticate, callBack } from '../utils/discordPassport';
import tokenController from '../controllers/tokenController';
import authorizationMiddleware from '../middlewares/authMiddleware';

const router: Router = Router();

// router.get('/discord/user', async (req, res) => {
//   const userData = req.signedCookies.user_data;
//   if (userData && userData.accessToken) {
//     try {
//       const db_user = await mongo_db.findUserById(userData.user.discordId);
//       if (db_user) {
//         const user: UserDto = {
//           discordId: db_user.discordId,
//           username: db_user.username,
//           highestRole: db_user.highestRole,
//           factions: db_user.factions,
//           displayName: db_user.displayName,
//           characters: [], // TODO: Fix this to fetch from characters table
//         };
//         res.status(200).json(user);
//       } else {
//         res.status(404).json({ message: 'User not found' });
//       }
//     } catch (error) {
//       res.status(500).json({ message: 'Internal server error', error });
//     }
//   } else {
//     res.status(401).json({ message: 'Not authenticated' });
//   }
// });

router.post('/logout', async (req, res) => {
  try {
    const authHeader = req.headers['cookie'];
    if (!authHeader) return res.sendStatus(204);
    res.setHeader('Clear-Site-Data', '"cookies"');
    res.status(200).redirect('http://localhost:4001');
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
  res.end();
});

router.get('/auth/discord', authenticate());
router.get(
  '/auth/discord/callback',
  callBack(),
  asyncHandler(tokenController.generateToken)
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
