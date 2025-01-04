import express, { Application } from 'express';
import helmet from 'helmet';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import { initializeDatabase } from './database/database';
import errorHandler from './middlewares/errorHandler';
import { routes } from './routes/routes';
import rateLimit from 'express-rate-limit';
import { envChecker } from './utils/envChecker';
import cors from 'cors';
import passport from 'passport';
import './utils/discordPassport';
import { general } from './constants/constants';
import genFunc from 'connect-pg-simple';
config();
envChecker();

const sessionSecret = process.env.SESSION_SECRET!;

export const app: Application = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(sessionSecret));
const PostgresqlStore = genFunc(session);
const sessionStore = new PostgresqlStore({
  conString: process.env.DB_URL,
});
app.use(
  session({
    secret: sessionSecret,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV !== general.DEV_MODE,
      maxAge: 1000 * 60 * 60 * 24,
    },
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);
app.use(
  cors({
    origin: process.env.FRONTEND_URL!,
    credentials: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

initializeDatabase();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
});
app.use(limiter);
app.use('/api', routes);

app.use(express.static(__dirname + '/assets'));
app.use(errorHandler); //has to be last

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.info(`server up on port ${PORT}`);
});
