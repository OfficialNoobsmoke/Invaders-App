import { UUID } from 'crypto';
import { db } from '../database/database';
import { characters } from 'database/schema/characters';

// Function to create a new character
export const createCharacter = async (
  name: string,
  faction: 'Alliance' | 'Horde',
  characterClass: string,
  ownerId: string
) => {
  const newCharacter = await db.insert(characters).values({
    name,
    faction,
    class: characterClass,
    ownerId,
  });

  return newCharacter;
};

// Function to get all characters for a specific user (ownerId)
export const getCharactersByUserId = async (ownerId: string) => {
  const userCharacters = await db
    .select()
    .from(characters)
    .where(characters.ownerId.equals(ownerId))
    .all();

  return userCharacters;
};

// Function to get a specific character by its ID
export const getCharacterById = async (id: string) => {
  const character = await db
    .select()
    .from(characters)
    .where(characters.id.equals(id))
    .first(); // Fetch the first (or only) match

  return character;
};

// Function to update a character's details
export const updateCharacter = async (
  id: string,
  updatedData: Partial<{
    name: string;
    faction: 'Alliance' | 'Horde';
    class: string;
  }>
) => {
  const updatedCharacter = await db
    .update(characters)
    .set(updatedData)
    .where(characters.id.equals(id))
    .returning();

  return updatedCharacter;
};

// Function to delete a character by its ID
export const deleteCharacterById = async (id: string) => {
  const result = await db
    .delete()
    .from(characters)
    .where(characters.id.equals(id));

  return result;
};
