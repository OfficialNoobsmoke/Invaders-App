export interface AuthCookie {
  authentication: {
    accessToken: string;
    refreshToken: string;
  };
  discordAuthentication: {
    accessToken: string;
    refreshToken: string;
  };
  userId: string;
}
