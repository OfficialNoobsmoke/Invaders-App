import { ApplicationError } from '../exceptions/applicationError';

//If you add a new env variable, add a check here
export const envChecker = () => {
  app();
  database();
  discord();
  session();
};

const app = () => {
  if (!process.env.NODE_ENV) {
    throw new ApplicationError(
      'NODE_ENV is not defined in environment variables.'
    );
  }

  if (!process.env.PORT) {
    throw new ApplicationError('PORT is not defined in environment variables.');
  }

  if (!process.env.FRONTEND_URL) {
    throw new ApplicationError(
      'FRONTEND_URL is not defined in environment variables.'
    );
  }

  if (!process.env.HASH_SECRET) {
    throw new ApplicationError(
      'HASH_SECRET is not defined in environment variables.'
    );
  }
};

const database = () => {
  if (!process.env.DB_NAME) {
    throw new ApplicationError(
      'DB_NAME is not defined in environment variables.'
    );
  }

  if (!process.env.DB_URL) {
    throw new ApplicationError(
      'DB_URL is not defined in environment variables.'
    );
  }

  if (!process.env.DB_ADMIN_URL) {
    throw new ApplicationError(
      'DB_ADMIN_URL is not defined in environment variables.'
    );
  }
};

const discord = () => {
  if (!process.env.DISCORD_CLIENT_ID) {
    throw new ApplicationError(
      'DISCORD_CLIENT_ID is not defined in environment variables.'
    );
  }

  if (!process.env.DISCORD_CLIENT_SECRET) {
    throw new ApplicationError(
      'DISCORD_CLIENT_SECRET is not defined in environment variables.'
    );
  }

  if (!process.env.DISCORD_CALLBACK_URL) {
    throw new ApplicationError(
      'DISCORD_CALLBACK_URL is not defined in environment variables.'
    );
  }

  if (!process.env.DISCORD_INVADERS_SERVER_ID) {
    throw new ApplicationError(
      'DISCORD_INVADERS_SERVER_ID is not defined in environment variables.'
    );
  }

  if (!process.env.DISCORD_BOT_TOKEN) {
    throw new ApplicationError(
      'DISCORD_BOT_TOKEN is not defined in environment variables.'
    );
  }
};

const session = () => {
  if (!process.env.SESSION_SECRET) {
    throw new ApplicationError(
      'SESSION_SECRET is not defined in environment variables.'
    );
  }

  if (!process.env.JWT_SECRET) {
    throw new ApplicationError(
      'JWT_SECRET is not defined in environment variables.'
    );
  }

  if (!process.env.JWT_ACCESS_TOKEN_EXPIRY) {
    throw new ApplicationError(
      'JWT_ACCESS_TOKEN_EXPIRY is not defined in environment variables.'
    );
  }

  if (!process.env.JWT_REFRESH_TOKEN_EXPIRY) {
    throw new ApplicationError(
      'JWT_REFRESH_TOKEN_EXPIRY is not defined in environment variables.'
    );
  }
};
