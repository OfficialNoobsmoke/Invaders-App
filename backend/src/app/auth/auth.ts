import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import dotenv from "dotenv";
import User from "../database/schemas/UserSchema";
import jwt from "jsonwebtoken";
import MongoDB from "../database/database";

dotenv.config();

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
  throw new Error("One or more Discord environment variables are missing");
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
          scope: ["identify", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            let user = await User.findOne({
              discordId: profile.id,
              username: profile.username,
            });
            if (user) {
              console.log(`User ${profile.username} logged in`);
              return done(null, user);
            } else {
              return done(null, false, { message: "User not found" });
            }
          } catch (err) {
            return done(err, profile);
          }
        },
      ),
    );

    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((obj, done) => {
      // @ts-ignore
      return done(null, obj);
    });
  }

  async getUser(username: string) {
    try {
      return User.findOne({ username });
    } catch (err) {
      console.error("Error fetching user:", err);
      throw new Error("User not found");
    }
  }

  authenticateToken(req: any, res: any, next: any) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET as string, (err: any, user: any) => {
      console.log(err);

      if (err) return res.sendStatus(403);

      req.user = user;

      next();
    });
  }

  getPassport() {
    return passport;
  }
}

const DiscAuth = new DiscordAuth();
export const DiscordPassport = DiscAuth.getPassport();
