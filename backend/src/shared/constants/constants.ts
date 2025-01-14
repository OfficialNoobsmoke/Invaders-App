export const errorMessages = Object.freeze({
  NO_COOKIE_FOUND: 'Unauthorized: No cookie found',
  INVALID_TOKEN: 'Unauthorized: Invalid token',
  TOKEN_EXPIRED: 'Unauthorized: Token expired',
  TOKEN_NOT_VERIFIED: 'Unauthorized: Token could not be verified',
  INTERNAL_SERVER_ERROR: 'Internal server error',
});

export const general = Object.freeze({
  AUTH_COOKIE: 'authentication',
  DEV_MODE: 'dev',
});

export const frontEndRoutes = Object.freeze({
  INDEX_PAGE: '/',
  HOME_PAGE: '/home',
  NOT_IN_DISCORD_PAGE: '/not-in-discord',
});

export const externalRoutes = Object.freeze({
  WARMANE_ARMORY_API_CHARACTER_PROFILE:
    'https://armory.warmane.com/api/character/{0}/{1}/profile',
});
