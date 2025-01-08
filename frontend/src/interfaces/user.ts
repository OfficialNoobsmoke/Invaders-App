export interface User {
  id: string;
  discordId: string;
  username: string;
  displayName?: string;
  email?: string;
  isInDiscord?: boolean;
  profileImageUrl: string;
  lastLogin: Date;
  createdAt: Date;
}
