export interface Pagination<T> {
  data: T[];
  page: number;
  pageSize: number;
  count: number;
}
