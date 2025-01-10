export interface Pagination<T> {
  data: T[];
  page: number;
  limit: number;
  count: number;
}
