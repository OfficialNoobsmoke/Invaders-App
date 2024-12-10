declare namespace Express {
  export interface Request {
    user: { discordId: string; username: string };
    accessToken: string;
  }
}
