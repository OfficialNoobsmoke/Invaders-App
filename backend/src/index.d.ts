declare namespace Express {
  export interface Request {
    userId: string
    authInfo: {
      discordAuthentication: {
        accessToken: string
        refreshToken: string
      }
    }
  }
}
