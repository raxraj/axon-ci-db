import { mysqlTable, varchar, int, timestamp, mysqlEnum, text } from 'drizzle-orm/mysql-core';
import { users } from './users';

export const userOauthConnections = mysqlTable('user_oauth_connections', {
  id: int('id').primaryKey().autoincrement(),
  
  // User reference
  userId: int('user_id').references(() => users.id).notNull(),
  
  // OAuth provider information
  oauthProvider: mysqlEnum('oauth_provider', ['github', 'gitlab', 'google']).notNull(),
  oauthId: varchar('oauth_id', { length: 100 }).notNull(),
  
  // Provider-specific information
  username: varchar('username', { length: 100 }).notNull(),
  profileUrl: varchar('profile_url', { length: 500 }),
  
  // OAuth tokens
  accessToken: text('access_token').notNull(),
  refreshToken: text('refresh_token'), // nullable - not all providers give refresh tokens
  tokenExpiresAt: timestamp('token_expires_at'), // nullable - some tokens don't expire
  
  // Token scopes/permissions
  scopes: text('scopes'), // JSON string of granted scopes
  
  // Timestamps
  connectedAt: timestamp('connected_at').defaultNow(),
  lastUsedAt: timestamp('last_used_at').defaultNow(),
});