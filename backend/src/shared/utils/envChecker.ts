import { ApplicationError } from '../exceptions/applicationError';

//If you add a new env variable, add a check here
export const envChecker = () => {
  app();
  database();
  discord();
  session();
};

const app = () => {
  const errors = [];
  if (!process.env.NODE_ENV) {
    errors.push('NODE_ENV is not defined in environment variables.');
  }

  if (!process.env.PORT) {
    errors.push('PORT is not defined in environment variables.');
  }

  if (!process.env.FRONTEND_URL) {
    errors.push('FRONTEND_URL is not defined in environment variables.');
  }

  if (!process.env.HASH_SECRET) {
    errors.push('HASH_SECRET is not defined in environment variables.');
  }
  throw new ApplicationError(errors);
};

const database = () => {
  const errors = [];
  if (!process.env.DB_NAME) {
    errors.push('DB_NAME is not defined in environment variables.');
  }

  if (!process.env.DB_URL) {
    errors.push('DB_URL is not defined in environment variables.');
  }

  if (!process.env.DB_ADMIN_URL) {
    errors.push('DB_ADMIN_URL is not defined in environment variables.');
  }
  throw new ApplicationError(errors);
};

const discord = () => {
  const errors = [];
  if (!process.env.DISCORD_CLIENT_ID) {
    errors.push('DISCORD_CLIENT_ID is not defined in environment variables.');
  }

  if (!process.env.DISCORD_CLIENT_SECRET) {
    errors.push(
      'DISCORD_CLIENT_SECRET is not defined in environment variables.'
    );
  }

  if (!process.env.DISCORD_CALLBACK_URL) {
    errors.push(
      'DISCORD_CALLBACK_URL is not defined in environment variables.'
    );
  }

  if (!process.env.DISCORD_INVADERS_SERVER_ID) {
    errors.push(
      'DISCORD_INVADERS_SERVER_ID is not defined in environment variables.'
    );
  }

  if (!process.env.DISCORD_BOT_TOKEN) {
    errors.push('DISCORD_BOT_TOKEN is not defined in environment variables.');
  }
  throw new ApplicationError(errors);
};

const session = () => {
  const errors = [];
  if (!process.env.SESSION_SECRET) {
    errors.push('SESSION_SECRET is not defined in environment variables.');
  }

  if (!process.env.JWT_SECRET) {
    errors.push('JWT_SECRET is not defined in environment variables.');
  }

  if (!process.env.JWT_ACCESS_TOKEN_EXPIRY) {
    errors.push(
      'JWT_ACCESS_TOKEN_EXPIRY is not defined in environment variables.'
    );
  }

  if (!process.env.JWT_REFRESH_TOKEN_EXPIRY) {
    errors.push(
      'JWT_REFRESH_TOKEN_EXPIRY is not defined in environment variables.'
    );
  }
  throw new ApplicationError(errors);
};
