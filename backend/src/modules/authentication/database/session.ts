import { pgTable, text, json, timestamp, index } from 'drizzle-orm/pg-core';

export const session = pgTable(
  'session',
  {
    sid: text('sid').notNull().primaryKey(),
    sess: json('sess').notNull(),
    expire: timestamp('expire', { withTimezone: true }).notNull(),
  },
  (table) => ({
    expireIndex: index('IDX_session_expire').on(table.expire),
  })
);
