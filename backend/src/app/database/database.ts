import { Client } from 'pg';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { config } from 'dotenv';
import { exec } from 'child_process';
import { seedDatabase } from './seed';
config();

let db: (NodePgDatabase<typeof schema> & { $client: Client }) | null = null;

export const getDatabase = async () => {
  try {
    if (db) {
      return db;
    }
    const dbClient = new Client({ connectionString: process.env.DB_URL });
    await dbClient.connect();

    db = drizzle(dbClient, { schema });
    console.log('Connected to the application database successfully.');
    return db;
  } catch (error) {
    console.error('Error initializing application database:', error);
    process.exit(1);
  }
};

export const createDatabaseIfNotExists = async () => {
  const dbName = process.env.DB_NAME;
  const dbClient = new Client({ connectionString: process.env.DB_ADMIN_URL });
  try {
    await dbClient.connect();

    const checkDbQuery = `
      SELECT 1 FROM pg_database WHERE datname = $1;
    `;
    const result = await dbClient.query(checkDbQuery, [dbName]);

    if (result.rowCount === 0) {
      console.log(`Database "${dbName}" does not exist. Creating...`);
      await dbClient.query(`CREATE DATABASE "${dbName}";`);
      console.log(`Database "${dbName}" created successfully.`);
      await applyMigrations();
    } else {
      console.log(`Database "${dbName}" already exists.`);
    }
  } catch (error) {
    console.error('Error creating database:', error);
    dbClient.end();
    process.exit(1);
  } finally {
    dbClient.end();
  }
};

export const initializeDatabase = async () => {
  await createDatabaseIfNotExists();
  await seedDatabase();
};

const applyMigrations = async () => {
  return new Promise<string>((resolve, reject) => {
    exec('npx drizzle-kit migrate', (error, stdout, stderr) => {
      if (error) {
        console.error('Error running migrations:', stderr);
        reject(error);
      } else {
        console.log('Migrations applied successfully:\n', stdout);
        resolve(stdout);
      }
    });
  });
};
