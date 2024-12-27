//If you add a new env variable, add a check here
export const envChecker = () => {
  app();
  database();
  discord();
  session();
};

const app = () => {
  if (!process.env.NODE_ENV) {
    throw new Error('NODE_ENV is not defined in environment variables.');
  }

  if (!process.env.PORT) {
    throw new Error('PORT is not defined in environment variables.');
  }

  if (!process.env.FRONTEND_URL) {
    throw new Error('FRONTEND_URL is not defined in environment variables.');
  }

  if (!process.env.HASH_SECRET) {
    throw new Error('HASH_SECRET is not defined in environment variables.');
  }
};

const database = () => {
  if (!process.env.DB_NAME) {
    throw new Error('DB_NAME is not defined in environment variables.');
  }

  if (!process.env.DB_URL) {
    throw new Error('DB_URL is not defined in environment variables.');
  }

  if (!process.env.DB_ADMIN_URL) {
    throw new Error('DB_ADMIN_URL is not defined in environment variables.');
  }
};

const discord = () => {
  if (!process.env.DISCORD_CLIENT_ID) {
    throw new Error(
      'DISCORD_CLIENT_ID is not defined in environment variables.'
    );
  }

  if (!process.env.DISCORD_CLIENT_SECRET) {
    throw new Error(
      'DISCORD_CLIENT_SECRET is not defined in environment variables.'
    );
  }

  if (!process.env.DISCORD_CALLBACK_URL) {
    throw new Error(
      'DISCORD_CALLBACK_URL is not defined in environment variables.'
    );
  }

  if (!process.env.DISCORD_INVADERS_SERVER_ID) {
    throw new Error(
      'DISCORD_INVADERS_SERVER_ID is not defined in environment variables.'
    );
  }
};

const session = () => {
  if (!process.env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET is not defined in environment variables.');
  }

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables.');
  }
};
