import passport from 'passport';
import { Strategy as DiscordStrategy, Profile } from 'passport-discord';
import userRepository from '../repositories/userRepository';
import { IRequestUser } from '../interfaces/IRequestUser';
import {
  createDiscordTokenForUser,
  getOrCreateUserFromProfile,
} from '../services/discordAuthenticationService';

const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_CALLBACK_URL } =
  process.env;

passport.use(
  new DiscordStrategy(
    {
      clientID: DISCORD_CLIENT_ID as string,
      clientSecret: DISCORD_CLIENT_SECRET as string,
      callbackURL: DISCORD_CALLBACK_URL,
      scope: ['identify', 'email', 'guilds', 'guilds.members.read'],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done
    ) => {
      const user = await getOrCreateUserFromProfile(accessToken, profile);
      await createDiscordTokenForUser(user.id, accessToken, refreshToken);
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, (user as IRequestUser).id);
});

passport.deserializeUser(async (userId: string, done) => {
  const user = await userRepository.getUserById(userId);
  done(null, user.id);
});

export const authenticate = () => {
  return passport.authenticate('discord');
};

export const callBack = () => {
  return passport.authenticate('discord', {
    failureRedirect: '/api/auth/failure',
  });
};
