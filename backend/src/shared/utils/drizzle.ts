import { AnyColumn, SQL, GetColumnData } from 'drizzle-orm';

export const aliasedColumn = <T extends AnyColumn>(
  column: T,
  alias: string
): SQL.Aliased<GetColumnData<T>> => {
  return column.getSQL().mapWith(column.mapFromDriverValue).as(alias);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function enumToPgEnum<T extends Record<string, any>>(
  myEnum: T
): [T[keyof T], ...T[keyof T][]] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Object.values(myEnum).map((value: any) => `${value}`) as any;
}
