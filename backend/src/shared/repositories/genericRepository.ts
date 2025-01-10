import {
  SQL,
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
import { PgColumn, PgSelect } from 'drizzle-orm/pg-core';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from '../../app/database/schema';
import { QueryConfiguration } from '../interfaces/queryConfiguration';
import { aliasedColumn } from '../utils/drizzle';
import { HTTPError } from '../exceptions/httpError';
import { HttpStatusCode } from 'axios';

const buildFilterConditions = (
  filterModel: { field: string; operator: string; value: string | string[] }[],
  filterColumn: PgColumn
): SQL<unknown>[] => {
  return filterModel
    .filter(
      (filterConfig) =>
        filterConfig.value ||
        filterConfig.operator === 'isEmpty' ||
        filterConfig.operator === 'isNotEmpty'
    )
    .map((filterConfig) => {
      switch (filterConfig.operator) {
        case 'contains':
          return like(filterColumn, `%${filterConfig.value}%`);
        case 'equals':
        case '=':
        case 'is':
          if (
            filterColumn.columnType === 'PgTime' ||
            filterColumn.columnType === 'PgTimestamp'
          ) {
            return eq(sql`date(${filterColumn})`, sql`${filterConfig.value}`);
          } else {
            return eq(filterColumn, filterConfig.value);
          }
        case 'startsWith':
          return like(filterColumn, `${filterConfig.value}%`);
        case 'endsWith':
          return like(filterColumn, `%${filterConfig.value}`);
        case '>':
          return gt(filterColumn, filterConfig.value);
        case '<':
          return lt(filterColumn, filterConfig.value);
        case '>=':
          return gte(filterColumn, filterConfig.value);
        case '<=':
          return lte(filterColumn, filterConfig.value);
        case 'not':
        case '!=':
        case 'isNot':
          if (
            filterColumn.columnType === 'PgTime' ||
            filterColumn.columnType === 'PgTimestamp'
          ) {
            return ne(sql`date(${filterColumn})`, sql`${filterConfig.value}`);
          } else {
            return ne(filterColumn, filterConfig.value);
          }
        case 'isAnyOf':
          return inArray(filterColumn, filterConfig.value as string[]);
        case 'before':
          return lt(sql`date(${filterColumn})`, filterConfig.value);
        case 'after':
          return gt(sql`date(${filterColumn})`, filterConfig.value);
        case 'onOrAfter':
          return gte(sql`date(${filterColumn})`, filterConfig.value);
        case 'onOrBefore':
          return lte(sql`date(${filterColumn})`, filterConfig.value);
        case 'isEmpty':
          return sql`${filterColumn} IS NULL`;
        case 'isNotEmpty':
          return sql`${filterColumn} IS NOT NULL`;
        default:
          return null;
      }
    })
    .filter(Boolean) as SQL<unknown>[];
};

const buildSortConditions = (
  sortModel: { field: string; sort: string }[],
  sortColumn: PgColumn
): SQL<unknown>[] => {
  return sortModel
    .filter((sortConfig) => sortColumn.name === sortConfig.field)
    .map((sortConfig) => {
      const direction = sortConfig.sort === 'asc' ? 'ASC' : 'DESC';
      return sql`${sql.identifier(sortColumn.name)} ${sql.raw(direction)}`;
    });
};

const fetchTotalCount = async (
  db: NodePgDatabase<typeof schema> & { $client: Client },
  query: PgSelect,
  columnName: string
) => {
  const subQuery = query.as('sub');
  console.log(query.toSQL());
  const result = await db
    .select({
      total: sql<number>`COUNT(DISTINCT sub.${sql.raw(columnName)})`,
    })
    .from(subQuery)
    .execute();

  return +result[0]?.total || 0;
};

export const getEntities = async (
  queryConfiguration: QueryConfiguration,
  page: number,
  limit: number,
  filterModel: { field: string; operator: string; value: string }[] = [],
  sortModel: { field: string; sort: string }[] = []
) => {
  const db = await getDatabase();
  const query = db
    .select(extractColumnsAsRecord(queryConfiguration))
    .from(queryConfiguration.table)
    .where(queryConfiguration.where)
    .$dynamic();

  addJoinsToQuery(query, queryConfiguration);

  const offset = page * limit;

  if (filterModel.length > 0) {
    const filterColumn = getColumnByName(
      filterModel[0]?.field,
      queryConfiguration
    );
    query.where(and(...buildFilterConditions(filterModel, filterColumn)));
  }

  const totalCount = await fetchTotalCount(
    db,
    query,
    queryConfiguration.totalCountAggregate.name
  );

  query.limit(limit).offset(offset);
  if (sortModel.length > 0) {
    const sortColumn = getColumnByName(sortModel[0]?.field, queryConfiguration);
    query.orderBy(...buildSortConditions(sortModel, sortColumn));
  }

  const entities = await query.execute();

  return {
    page: page,
    limit,
    count: totalCount,
    data: entities,
  };
};

const extractColumnsAsRecord = (
  queryConfigurations: QueryConfiguration
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, any> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const extractedColumns: Record<string, SQL.Aliased<any>> = {};

  Object.entries(queryConfigurations.columns).forEach(
    ([attributeName, column]) => {
      extractedColumns[attributeName] = aliasedColumn(column, attributeName);
    }
  );

  return extractedColumns;
};

const addJoinsToQuery = (
  query: PgSelect,
  queryConfigurations: QueryConfiguration
) => {
  queryConfigurations.joins?.forEach((join) => {
    switch (join.type) {
      case 'left':
        query.leftJoin(join.table, join.condition);
        break;
      case 'inner':
        query.innerJoin(join.table, join.condition);
        break;
      case 'right':
        query.rightJoin(join.table, join.condition);
        break;
      case 'full':
        query.fullJoin(join.table, join.condition);
        break;
      default:
        break;
    }
  });
};

const getColumnByName = (
  columnName: string,
  queryConfigurations: QueryConfiguration
): PgColumn => {
  for (const [attributeName, column] of Object.entries(
    queryConfigurations.columns
  )) {
    if (attributeName === columnName) {
      return column;
    }
  }

  throw new HTTPError(
    `${columnName} does not exist or is not accessible`,
    HttpStatusCode.BadRequest
  );
};
