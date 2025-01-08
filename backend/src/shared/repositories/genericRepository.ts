import {
  SQL,
  Column,
  like,
  gt,
  lt,
  and,
  sql,
  gte,
  lte,
  inArray,
  eq,
  ne,
} from 'drizzle-orm';
import { getDatabase } from '../../app/database/database';
import {
  getTableConfig,
  PgColumn,
  PgSelect,
  PgTable,
} from 'drizzle-orm/pg-core';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from '../../app/database/schema';

const buildFilterConditions = (
  filterModel: { field: string; operator: string; value: string | string[] }[],
  columnMapping: Record<string, { table: PgTable; column: PgColumn }>
): SQL<unknown>[] => {
  return filterModel
    .filter(
      (filterConfig) =>
        columnMapping[filterConfig.field] &&
        (filterConfig.value ||
          filterConfig.operator === 'isEmpty' ||
          filterConfig.operator === 'isNotEmpty')
    )
    .map((filterConfig) => {
      const configField = columnMapping[filterConfig.field];
      const tableConfig = getTableConfig(configField.table);
      const column = tableConfig.columns.find(
        (col) => col.name === configField.column.name
      ) as Column;
      switch (filterConfig.operator) {
        case 'contains':
          return sql.raw(
            `${tableConfig.name}.${configField.column.name} LIKE '%' || '${filterConfig.value}' || '%'`
          );
        case 'equals':
        case '=':
        case 'is':
          if (
            column.columnType === 'PgTime' ||
            column.columnType === 'PgTimestamp'
          ) {
            return eq(sql`date(${column})`, sql`${filterConfig.value}`);
          } else {
            return eq(column, filterConfig.value);
          }
        case 'startsWith':
          return like(column, `${filterConfig.value}%`);
        case 'endsWith':
          return like(column, `%${filterConfig.value}`);
        case '>':
          return gt(column, filterConfig.value);
        case '<':
          return lt(column, filterConfig.value);
        case '>=':
          return gte(column, filterConfig.value);
        case '<=':
          return lte(column, filterConfig.value);
        case 'not':
        case '!=':
        case 'isNot':
          if (
            column.columnType === 'PgTime' ||
            column.columnType === 'PgTimestamp'
          ) {
            return ne(sql`date(${column})`, sql`${filterConfig.value}`);
          } else {
            return ne(column, filterConfig.value);
          }
        case 'isAnyOf':
          return inArray(column, filterConfig.value as string[]);
        case 'before':
          return lt(sql`date(${column})`, filterConfig.value);
        case 'after':
          return gt(sql`date(${column})`, filterConfig.value);
        case 'onOrAfter':
          return gte(sql`date(${column})`, filterConfig.value);
        case 'onOrBefore':
          return lte(sql`date(${column})`, filterConfig.value);
        case 'isEmpty':
          return sql`${column} IS NULL`;
        case 'isNotEmpty':
          return sql`${column} IS NOT NULL`;
        default:
          return null;
      }
    })
    .filter(Boolean) as SQL<unknown>[];
};

const buildSortConditions = (
  sortModel: { field: string; sort: string }[],
  columnMapping: Record<string, { table: PgTable; column: PgColumn }>
): SQL<unknown>[] => {
  return sortModel
    .filter((sortConfig) => columnMapping[sortConfig.field])
    .map((sortConfig) => {
      const configField = columnMapping[sortConfig.field];
      return sql`${configField} ${sortConfig.sort === 'asc' ? 'ASC' : 'DESC'}`;
    });
};

const fetchTotalCount = async (
  db: NodePgDatabase<typeof schema> & { $client: Client },
  query: PgSelect
) => {
  const subQuery = query.as('sub');
  const result = await db
    .select({ total: sql<number>`count(*)` })
    .from(subQuery)
    .execute();

  return +result[0]?.total || 0;
};

export const getEntities = async <T extends PgSelect>(
  query: T,
  page: number,
  pageSize: number,
  filterModel: { field: string; operator: string; value: string }[] = [],
  sortModel: { field: string; sort: string }[] | null = null,
  columnMapping: Record<string, { table: PgTable; column: PgColumn }>
) => {
  const db = await getDatabase();
  const offset = page * pageSize;

  const whereConditions = buildFilterConditions(filterModel, columnMapping);

  const orderByClause = sortModel
    ? buildSortConditions(sortModel, columnMapping)
    : [];

  const totalCount = await fetchTotalCount(db, query);

  query
    .where(and(...whereConditions))
    .limit(pageSize)
    .offset(offset);
  console.log(query.toSQL());

  if (orderByClause.length > 0) {
    query.orderBy(...orderByClause);
  }

  const entities = await query.execute();

  return {
    page: page,
    pageSize,
    count: totalCount,
    data: entities,
  };
};
