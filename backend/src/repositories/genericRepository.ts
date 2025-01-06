import {
  SQL,
  Column,
  like,
  gt,
  lt,
  eq,
  asc,
  desc,
  and,
  sql,
  gte,
  lte,
  ne,
  isNull,
  isNotNull,
  inArray,
} from 'drizzle-orm';
import { getDatabase } from '../database/database';
import { getTableConfig, PgSelect } from 'drizzle-orm/pg-core';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from '../database/schema';

const buildFilterConditions = (
  filterModel: { field: string; operator: string; value: string | string[] }[],
  validColumns: string[],
  tableConfig: ReturnType<typeof getTableConfig>
): SQL<unknown>[] => {
  return filterModel
    .filter(
      (filterConfig) =>
        validColumns.includes(filterConfig.field) && filterConfig.value
    )
    .map((filterConfig) => {
      const column = tableConfig.columns.find(
        (col) => col.name === filterConfig.field
      ) as Column;

      switch (filterConfig.operator) {
        case 'contains':
          return like(column, `%${filterConfig.value}%`);
        case 'equals':
        case '=':
        case 'is':
          return eq(column, filterConfig.value);
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
        case 'isNull':
          return isNull(column);
        case 'isNotNull':
          return isNotNull(column);
        case 'not':
        case '!=':
          return ne(column, filterConfig.value);
        case 'isAnyOf':
          return inArray(column, filterConfig.value as string[]);
        case 'between': {
          // delete this
          const [startDate, endDate] = (filterConfig.value as string).split(
            ','
          );
          return and(gte(column, startDate), lte(column, endDate));
        }
        case 'before':
          return lt(sql`date(${column})`, filterConfig.value);
        case 'after':
          return gt(sql`date(${column})`, filterConfig.value);
        default:
          return null;
      }
    })
    .filter(Boolean) as SQL<unknown>[];
};

const buildSortConditions = (
  sortModel: { field: string; sort: string }[],
  validColumns: string[],
  tableConfig: ReturnType<typeof getTableConfig>
): SQL<unknown>[] => {
  return sortModel
    .filter((sortConfig) => validColumns.includes(sortConfig.field))
    .map((sortConfig) => {
      const column = tableConfig.columns.find(
        (col) => col.name === sortConfig.field
      ) as Column;

      return sortConfig.sort === 'asc' ? asc(column) : desc(column);
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
  tableConfig: ReturnType<typeof getTableConfig>,
  page: number,
  pageSize: number,
  filterModel: { field: string; operator: string; value: string }[] = [],
  sortModel: { field: string; sort: string }[] | null = null
) => {
  const db = await getDatabase();
  const offset = page * pageSize;
  const validColumns = tableConfig.columns.map((column) => column.name);

  const whereConditions = buildFilterConditions(
    filterModel,
    validColumns,
    tableConfig
  );

  const orderByClause = sortModel
    ? buildSortConditions(sortModel, validColumns, tableConfig)
    : [];

  const totalCount = await fetchTotalCount(db, query);

  query
    .where(and(...whereConditions))
    .limit(pageSize)
    .offset(offset);

  if (orderByClause.length > 0) {
    query.orderBy(...orderByClause);
  }

  const entities = (await query.execute()) as T[];

  return {
    page: page,
    pageSize,
    count: totalCount,
    data: entities,
  };
};
