export const buildRouteUrl = (route: string) => `${import.meta.env.REACT_APP_API_BASE_URL}${route}`;
export const buildRouteUrlWithFilter = (route: string, page: number, limit: number) =>
  `${import.meta.env.REACT_APP_API_BASE_URL}${route}?page=${page}&pageSize=${limit}`;
