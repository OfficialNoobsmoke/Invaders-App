import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema'; // Import your schemas here

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Replace with your DB URL
});

export const db = drizzle(pool, { schema });
