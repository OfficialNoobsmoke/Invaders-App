export interface IUser {
  id: string;
  username: string;
  email: string | null;
  displayName: string | null;
  isInDiscord: boolean | null;
  profileImageUrl: string;
  createdAt: Date;
  lastLogin: Date;
}
