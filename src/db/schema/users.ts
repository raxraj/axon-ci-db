import { mysqlTable, varchar, int, timestamp, boolean, text } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  
  // Basic user information
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  avatarUrl: varchar('avatar_url', { length: 500 }),
  
  // Optional profile information  
  company: varchar('company', { length: 255 }),
  location: varchar('location', { length: 255 }),
  bio: text('bio'),
  
  // App specific fields
  isActive: boolean('is_active').default(true),
  lastLoginAt: timestamp('last_login_at'),
  
  // Timestamps
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});