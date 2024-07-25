import express, { Application } from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import HttpException from "./app/models/http-exception.model";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import session from "express-session";
import cookieParser from "cookie-parser";
import { MainRouter } from "./app/routes/routes";
import dotenv from "dotenv";
import { discordPassport } from "./app/auth/auth";
import MongoDB from "./app/database/database";
import { DiscordBot } from "./utils/discord-bot/discordBot";

dotenv.config();

const sessionSecret = process.env.SESSION_SECRET;
const discordBotToken = process.env.DISCORD_BOT_TOKEN;
const nodeEnv = process.env.NODE_ENV || "dev";

if (!sessionSecret) {
  throw new Error("Missing required environment variables");
}
export const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(cookieParser());
app.use(
  session({
    secret: sessionSecret,
    cookie: {
      secure: nodeEnv === "production",
      maxAge: 60000,
    },
    resave: false,
    saveUninitialized: false,
  }),
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
});
app.use(limiter);

const bot = new DiscordBot();
bot.start();

app.use(discordPassport.initialize());
app.use(discordPassport.session());

app.use("/api", MainRouter);

app.use(express.static(__dirname + "/assets"));
/* eslint-disable */
app.use(
  (
    err: Error | HttpException,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    // @ts-ignore
    if (err && err.name === "UnauthorizedError") {
      return res.status(401).json({
        status: "error",
        message: "missing authorization credentials",
      });
      // @ts-ignore
    } else if (err && err.errorCode) {
      // @ts-ignore
      res.status(err.errorCode).json(err.message);
    } else if (err) {
      res.status(500).json(err.message);
    }
  },
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.info(`server up on port ${PORT}`);
});
