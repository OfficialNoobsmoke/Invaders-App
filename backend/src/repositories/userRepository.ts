import { eq } from 'drizzle-orm';
import { getDatabase } from '../database/database';
import { users } from '../database/schema/user';
import { characters } from '../database/schema/characters';
import { IUser } from '../interfaces/IUser';

export const createUser = async (data: {
  discordId: string;
  username: string;
  displayName?: string | null;
  email?: string;
  isInDiscord?: boolean;
  profileImageUrl: string;
}) => {
  const db = await getDatabase();
  const [newUser] = await db
    .insert(users)
    .values({
      discordId: data.discordId,
      username: data.username,
      displayName: data.displayName,
      email: data.email,
      isInDiscord: data.isInDiscord,
      profileImageUrl: data.profileImageUrl,
    })
    .returning();
  return newUser;
};

export const getUserById = async (id: string): Promise<IUser> => {
  const db = await getDatabase();
  const [user] = await db.select().from(users).where(eq(users.id, id));
  return user || null;
};

export const getUserByDiscordId = async (discordId: string): Promise<IUser> => {
  const db = await getDatabase();
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.discordId, discordId));
  return user || null;
};

export const getUserByUsername = async (username: string): Promise<IUser> => {
  const db = await getDatabase();
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.username, username));
  return user || null;
};

export const getUsersWithCharacters = async () => {
  const db = await getDatabase();
  const usersWithCharacters = await db
    .select()
    .from(users)
    .leftJoin(characters, eq(characters.ownerId, users.id));
  return usersWithCharacters;
};

export const updateUser = async (
  id: string,
  data: Partial<{
    displayName: string | null;
    email: string;
    isInDiscord: boolean;
    lastLogin: Date;
    profileImageUrl: string | null;
  }>
) => {
  const db = await getDatabase();
  const [updatedUser] = await db
    .update(users)
    .set({
      ...(data.displayName && { displayName: data.displayName }),
      ...(data.email && { email: data.email }),
      ...(data.isInDiscord && { isInDiscord: data.isInDiscord }),
      ...(data.lastLogin && { lastLogin: data.lastLogin }),
      ...(data.profileImageUrl && { profileImageUrl: data.profileImageUrl }),
    })
    .where(eq(users.id, id))
    .returning();
  return updatedUser || null;
};

export const deleteUser = async (id: string) => {
  const db = await getDatabase();
  const [deletedUser] = await db
    .delete(users)
    .where(eq(users.id, id))
    .returning();
  return deletedUser || null;
};

export const getUsers = async () => {
  const db = await getDatabase();
  return await db.select().from(users);
};

export default {
  createUser,
  getUserById,
  getUserByDiscordId,
  getUserByUsername,
  updateUser,
  deleteUser,
  getUsers,
  getUsersWithCharacters,
};
