import passport from 'passport';
import { Strategy as DiscordStrategy, Profile } from 'passport-discord';
import { PassportRequestUser } from '../interfaces/passportRequestUser';
import { getOrCreateUserFromProfile } from '../discordAuthenticationService';

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
      return done(null, user, {
        discordAuthentication: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, (user as PassportRequestUser).id);
});

passport.deserializeUser(async (userId: string, done) => {
  done(null, { id: userId });
});
