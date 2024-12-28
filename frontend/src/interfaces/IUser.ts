export interface IUser {
  id: string;
  discordId: string;
  username: string;
  displayName?: string;
  email?: string;
  isInDiscord?: boolean;
  lastLogin: Date;
  createdAt: Date;
}
