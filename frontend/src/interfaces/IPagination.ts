export interface IPagination<T> {
  data: T;
  page: number;
  limit: number;
  count: number;
}
