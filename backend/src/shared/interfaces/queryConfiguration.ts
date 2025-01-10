import { SQL } from 'drizzle-orm';
import { PgColumn, PgTable } from 'drizzle-orm/pg-core';
import { JoinType } from 'drizzle-orm/query-builders/select.types';

export interface QueryConfiguration {
  table: PgTable;
  columns: Record<string, PgColumn>;
  where?: SQL<unknown> | undefined;
  joins: { table: PgTable; type: JoinType; condition: SQL<unknown> }[];
  totalCountAggregate: PgColumn;
}
