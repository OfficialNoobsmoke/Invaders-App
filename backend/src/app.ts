import express, { Application } from 'express';
import helmet from 'helmet';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import { createDatabaseIfNotExists } from './database/database';
import errorHandler from './middlewares/errorHandler';
import { routes } from './routes/routes';
import rateLimit from 'express-rate-limit';
import { seedDatabase } from './database/seed';
config();

const sessionSecret = process.env.SESSION_SECRET;
const nodeEnv = process.env.NODE_ENV || 'dev';

if (!sessionSecret) {
  throw new Error('Missing required environment variables');
}
export const app: Application = express();

app.use(helmet());
app.use(express.json());
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
if (!(process.env.DB_Name && process.env.DB_Url)) {
  throw new Error('Missing required environment variables');
}
async function initApp() {
  await createDatabaseIfNotExists();
  await seedDatabase();
}

initApp();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
});
app.use(limiter);
app.use('/api', routes);

app.use(express.static(__dirname + '/assets'));
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.info(`server up on port ${PORT}`);
});
