import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

const config: Config = {
  dialect: 'postgresql',
  schema: './src/database/schema/index.ts',
  out: './src/database/migrations',
  dbCredentials: {
    url: process.env.DB_Url!,
  },
};

export default config;
