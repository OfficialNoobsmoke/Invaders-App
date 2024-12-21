import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

const config: Config = {
  dialect: 'postgresql',
  schema: './src/server/db/schema.ts',
  dbCredentials: {
    host: process.env.DB_HOST ?? 'localhost',
    port: process.env.DB_Port ? +process.env.DB_Port : 5432,
    user: process.env.DB_User,
    password: process.env.DB_Password,
    database: process.env.DB_DatabaseName ?? 'invadersDB',
    ssl: process.env.DB_SslMode as
      | boolean
      | 'require'
      | 'allow'
      | 'prefer'
      | 'verify-full'
      | undefined,
    url: process.env.DB_Url,
  },
};

export default config;
