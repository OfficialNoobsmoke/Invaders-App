declare namespace Express {
  interface Request {
    user: {
      id: string
    }
    authInfo: {
      discordAuthentication: {
        accessToken: string
        refreshToken: string
      }
    }
  }
}
