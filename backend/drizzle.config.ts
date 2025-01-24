import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

const config: Config = {
  dialect: 'postgresql',
  schema: './src/app/database/schema/index.ts',
  out: './src/app/database/migrations',
  dbCredentials: {
    url: process.env.DB_URL!,
  },
};

export default config;
