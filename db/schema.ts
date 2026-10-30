import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core';
// Anonymous site-wide counters only. No user profiles or journey text are stored here.
export const aiUsage = sqliteTable('ai_usage', {
  userId: text('user_id').notNull(), day: text('day').notNull(), count: integer('count').notNull().default(0),
}, t => [primaryKey({ columns: [t.userId, t.day] })]);
