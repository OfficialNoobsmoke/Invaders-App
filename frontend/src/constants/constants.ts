export const errorMessages = Object.freeze({
  NO_COOKIE_FOUND: 'Unauthorized: No cookie found',
});

export const general = Object.freeze({
  DEV_MODE: 'dev',
  TOKEN_EXPIRED: 'token_expired',
  MAX_SPECIALIZATIONS: 2,
});

export const apiRoutes = Object.freeze({
  LOGIN: '/auth/discord',
  LOGOUT: '/auth/logout',
  CHECK: '/auth/check',
  USER: '/user/me',
  APPLICATION_DATA: '/applicationData',
  CHARACTERS: '/characters',
  CHARACTER: '/character',
  CHARACTER_EXTERNAL: '/character/{0}/{1}/external',
  RAID_SESSION: '/raid-session',
  RAID_SESSIONS: '/raid-sessions',
});
