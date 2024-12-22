import passport from 'passport';
import { Strategy as DiscordStrategy } from 'passport-discord';
import userRepository from '../repositories/userRepository';
import { IUser } from '../interfaces/IUser';
import { getDataFromProfile } from '../services/discordAuthenticationService';

const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_CALLBACK_URL } =
  process.env;

passport.use(
  new DiscordStrategy(
    {
      clientID: DISCORD_CLIENT_ID as string,
      clientSecret: DISCORD_CLIENT_SECRET as string,
      callbackURL: DISCORD_CALLBACK_URL,
      scope: ['identify', 'email', 'guilds'],
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await getDataFromProfile(profile, accessToken, refreshToken);
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, (user as IUser).id);
});

passport.deserializeUser(async (discordId: string, done) => {
  const user = await userRepository.getUserByDiscordId(discordId);
  done(null, user.id);
});

// authenticateToken(req: Request, res: Response, next: NextFunction) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (token == null) return res.sendStatus(401);

//   jwt.verify(
//     token,
//     JWT_SECRET as string,
//     (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
//       if (err) return res.sendStatus(403);

//       if (typeof decoded === 'object' && decoded !== null) {
//         req.user = decoded as { discordId: string; username: string };
//       }
//       next();
//     }
//   );
// }

export const authenticate = () => {
  return passport.authenticate('discord');
};

export const callBack = () => {
  return passport.authenticate('discord', {
    failureRedirect: '/api/auth/failure',
  });
};
