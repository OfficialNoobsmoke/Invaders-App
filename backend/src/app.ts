import express, { Application } from 'express';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import MongoDB from './database/database';

const sessionSecret = process.env.SESSION_SECRET;
const nodeEnv = process.env.NODE_ENV || 'dev';

if (!sessionSecret) {
  throw new Error('Missing required environment variables');
}
export const app: Application = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(sessionSecret));
app.use(
  session({
    secret: sessionSecret,
    cookie: {
      secure: nodeEnv === 'production',
      maxAge: 1000 * 60 * 60 * 24,
    },
    resave: false,
    saveUninitialized: true,
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
});
app.use(limiter);

export const mongo_db = new MongoDB();
