import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import mysql from 'mysql2/promise';
import TypedEnv from 'typed-environment';

const env = new TypedEnv({
  DB_HOST: { type: "string", default: 'localhost' },
  DB_PORT: { type: "number", default: 3306 },
  DB_USER: { type: "string", default: 'root' },
  DB_PASSWORD: { type: "string", default: 'cosmos' },
  DB_NAME: { type: "string", default: 'axon_ci' },
});

export const config = env.init();

// Database connection configuration
const dbConfig = {
  host: config.DB_HOST,
  port: config.DB_PORT,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
};

async function runMigrations() {
  console.log('Starting database migration process...');
  
  // Create the MySQL connection pool
  const connection = await mysql.createConnection(dbConfig);
  
  try {
    // Initialize drizzle with the MySQL connection
    const db = drizzle(connection);
    
    // Run migrations from the drizzle directory
    console.log('Running migrations...');
    await migrate(db, { migrationsFolder: 'drizzle' });
    
    console.log('Migrations completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    // Close the connection regardless of success or failure
    await connection.end();
    console.log('Database connection closed');
  }
}

// Execute the migration function
runMigrations().catch((err) => {
  console.error('Unhandled error during migration:', err);
  process.exit(1);
});

