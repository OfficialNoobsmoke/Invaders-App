export const errorMessages = Object.freeze({
  NO_COOKIE_FOUND: 'Unauthorized: No cookie found',
});

export const general = Object.freeze({
  DEV_MODE: 'dev',
  TOKEN_EXPIRED: 'token_expired',
});

export const apiRoutes = Object.freeze({
  LOGIN: '/auth/discord',
  LOGOUT: '/auth/logout',
  CHECK: '/auth/check',
  USER: '/user/me',
  CHARACTERS: '/characters',
});
