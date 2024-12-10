import { Router } from 'express';
import { DiscordPassport } from '../utils/auth';
import { mongo_db } from '../app';
import { UserDto } from '../dto/UserDto';
import roleController from '../controllers/roleController';
import asyncHandler from '../middlewares/asyncHandler';

const router: Router = Router();

router.get(
  '/discord/redirect',
  DiscordPassport.authenticate('discord', { failureRedirect: '/' }),
  (req, res) => {
    const { user, accessToken } = req;
    if (accessToken) {
      const cookie = {
        accessToken,
        user: { discordId: user.discordId, username: user.username },
      };
      res
        .cookie('user_data', cookie, {
          signed: true,
          httpOnly: true, // DE PUS IN PRODUCTIE
          secure: true,
        })
        .redirect(`http://localhost:4001/home`);
    } else res.status(401).send('Error while authenticating!');
  }
);

router.get('/discord/user', async (req, res) => {
  const userData = req.signedCookies.user_data;
  if (userData && userData.accessToken) {
    try {
      const db_user = await mongo_db.findUserById(userData.user.discordId);
      if (db_user) {
        const user: UserDto = {
          discordId: db_user.discordId,
          username: db_user.username,
          highestRole: db_user.highestRole,
          factions: db_user.factions,
          displayName: db_user.displayName,
          characters: [], // TODO: Fix this to fetch from characters table
        };
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

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

router.post('/role', asyncHandler(roleController.createRole));
router.delete('/role', asyncHandler(roleController.deleteRole));

export const AuthRouter: Router = router;
