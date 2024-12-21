import { eq } from 'drizzle-orm';
import { getDatabase } from '../database/database';
import { characters } from '../database/schema';

export const createCharacter = async (
  name: string,
  faction: 'Alliance' | 'Horde',
  characterClass: string,
  ownerId: string,
  realmServerId: string
) => {
  const db = await getDatabase();
  const [newCharacter] = await db
    .insert(characters)
    .values({
      name,
      faction,
      class: characterClass,
      ownerId,
      realmServerId,
    })
    .returning();

  return newCharacter;
};

export const getCharactersByUserId = async (ownerId: string) => {
  const db = await getDatabase();
  const userCharacters = await db.query.characters.findMany({
    where: (characters, { eq }) => eq(characters.ownerId, ownerId),
  });

  return userCharacters;
};

export const getCharacterById = async (id: string) => {
  const db = await getDatabase();
  const character = await db.query.characters.findFirst({
    where: (characters, { eq }) => eq(characters.id, id),
  });

  return character;
};

export const updateCharacter = async (
  id: string,
  updatedData: Partial<{
    name: string;
    faction: 'Alliance' | 'Horde';
    class: string;
  }>
) => {
  const db = await getDatabase();
  const updatedCharacter = await db
    .update(characters)
    .set(updatedData)
    .where(eq(characters.id, id))
    .returning();

  return updatedCharacter;
};

export const deleteCharacterById = async (id: string) => {
  const db = await getDatabase();
  const result = await db.delete(characters).where(eq(characters.id, id));

  return result;
};

export default {
  createCharacter,
  getCharactersByUserId,
  getCharacterById,
  updateCharacter,
  deleteCharacterById,
};
