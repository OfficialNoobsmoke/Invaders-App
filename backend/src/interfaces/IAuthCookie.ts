export interface IAuthCookie {
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
