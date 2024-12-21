import { eq } from 'drizzle-orm';
import { db } from '../database/database';
import { users } from '../database/schema/user';
import { characters } from 'database/schema/characters';

export const createUser = async (data: {
  discordId: string;
  username: string;
  displayName?: string;
  email?: string;
}) => {
  const [newUser] = await db
    .insert(users)
    .values({
      discordId: data.discordId,
      username: data.username,
      displayName: data.displayName,
      email: data.email,
    })
    .returning();
  return newUser;
};

export const getUserById = async (id: string) => {
  const [user] = await db.select().from(users).where(eq(users.id, id));
  return user || null;
};

export const getUserByUsername = async (username: string) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.username, username));
  return user || null;
};

export const getUsersWithCharacters = async () => {
  const usersWithCharacters = await db
    .select()
    .from(users)
    .leftJoin(characters, eq(characters.ownerId, users.id));
  return usersWithCharacters;
};

export const updateUser = async (
  id: string,
  data: Partial<{ displayName: string; email: string }>
) => {
  const [updatedUser] = await db
    .update(users)
    .set({
      ...(data.displayName && { displayName: data.displayName }),
      ...(data.email && { email: data.email }),
    })
    .where(eq(users.id, id))
    .returning();
  return updatedUser || null;
};

export const deleteUser = async (id: string) => {
  const [deletedUser] = await db
    .delete(users)
    .where(eq(users.id, id))
    .returning();
  return deletedUser || null;
};

export const listUsers = async () => {
  return await db.select().from(users);
};
