import passport from 'passport';
import { Strategy as DiscordStrategy } from 'passport-discord';
import User from '../database/schema/user';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const {
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  DISCORD_CALLBACK_URL,
  JWT_SECRET,
} = process.env;

if (
  !DISCORD_CLIENT_ID ||
  !DISCORD_CLIENT_SECRET ||
  !DISCORD_CALLBACK_URL ||
  !JWT_SECRET
) {
  throw new Error('One or more Discord environment variables are missing');
}

class DiscordAuth {
  constructor() {
    this.initializePassport();
  }

  initializePassport() {
    passport.use(
      new DiscordStrategy(
        {
          clientID: DISCORD_CLIENT_ID as string,
          clientSecret: DISCORD_CLIENT_SECRET as string,
          callbackURL: DISCORD_CALLBACK_URL,
          scope: ['identify', 'email'],
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const user = await User.findOne({
              discordId: profile.id,
              username: profile.username,
            });
            if (user) {
              console.log(`User ${profile.username} authorized`);
              return done(null, { user, accessToken });
            } else {
              return done(null, false, {
                message: 'User not found',
              });
            }
          } catch (err) {
            return done(err, profile);
          }
        }
      )
    );

    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((obj: typeof User | null | undefined, done) => {
      return done(null, obj);
    });
  }

  async getUser(username: string) {
    try {
      return User.findOne({ username });
    } catch (err) {
      console.error('Error fetching user:', err);
      throw new Error('User not found');
    }
  }

  authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(
      token,
      JWT_SECRET as string,
      (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
        if (err) return res.sendStatus(403);

        if (typeof decoded === 'object' && decoded !== null) {
          req.user = decoded as { discordId: string; username: string };
        }
        next();
      }
    );
  }

  getPassport() {
    return passport;
  }
}

const DiscAuth = new DiscordAuth();
export const DiscordPassport = DiscAuth.getPassport();
