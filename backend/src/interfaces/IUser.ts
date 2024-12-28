export interface IUser {
  id: string;
  username: string;
  email: string | null;
  displayName: string | null;
  isInDiscord: boolean | null;
  createdAt: Date;
  lastLogin: Date;
}
