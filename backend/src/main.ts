import express, { Application } from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import session from "express-session";
import cookieParser from "cookie-parser";
import { MainRouter } from "./app/routes/routes";
import dotenv from "dotenv";
import { DiscordBot } from "./utils/discord-bot/discordBot";
import MongoDB from "./app/database/database";
import { DiscordPassport } from "./app/auth/auth";

dotenv.config();

const sessionSecret = process.env.SESSION_SECRET;
const nodeEnv = process.env.NODE_ENV || "dev";

if (!sessionSecret) {
  throw new Error("Missing required environment variables");
}
export const app: Application = express();

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:4001",
    credentials: true,
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(cookieParser(sessionSecret));
app.use(
  session({
    secret: sessionSecret,
    cookie: {
      secure: nodeEnv === "production",
      maxAge: 1000 * 60 * 60 * 24,
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

export const mongo_db = new MongoDB();

const bot = new DiscordBot();
bot.start();

app.use(DiscordPassport.initialize());
app.use(DiscordPassport.session());

app.use("/api", MainRouter);

app.use(express.static(__dirname + "/assets"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.info(`server up on port ${PORT}`);
});
