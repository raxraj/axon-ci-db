import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema',
  out: './drizzle',
  dialect: 'mysql',
  dbCredentials: {
    host: 'localhost',
    port: 3306,
    user: 'root',         // Default MySQL user, change if needed
    password: 'cosmos',    // Password for MySQL container
    database: 'axon_ci',  // Database name, change as needed
  },
  verbose: true,
  strict: true,
  tablesFilter: ['!migrations'],
} satisfies Config;

