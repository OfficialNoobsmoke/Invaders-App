export {};

declare global {
  namespace Express {
    interface Request {
      user: User;
      authInfo: {
        discordAuthentication: {
          accessToken: string;
          refreshToken: string;
        };
      };
    }
    interface User {
      id: string;
    }
  }
}
