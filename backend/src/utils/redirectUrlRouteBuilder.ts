export const getRedirectUrlRoute = (route: string) =>
  `${process.env.FRONTEND_URL}${route}`;
