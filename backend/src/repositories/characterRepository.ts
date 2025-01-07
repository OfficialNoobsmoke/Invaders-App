import { eq } from 'drizzle-orm';
import { getDatabase } from '../database/database';
import {
  characters,
  charactersPreferredInstances,
  charactersSavedInstances,
  characterSpecializations,
} from '../database/schema';
// import { fromDBManyToCharacters } from '../mappers/characterMapper';
// import { DBCharacter } from '../types/character';
import { getTableConfig } from 'drizzle-orm/pg-core';
import { getEntities } from './genericRepository';

export const createCharacter = async (
  name: string,
  faction: 'Alliance' | 'Horde',
  characterClass: string,
  ownerId: string,
  realmServerId: string,
  specializations: { name: string; gearScore: number }[] = [],
  preferredInstanceIds: string[] = [],
  savedInstanceIds: string[] = []
) => {
  const db = await getDatabase();
  return await db.transaction(async (tx) => {
    const [newCharacter] = await tx
      .insert(characters)
      .values({
        name,
        faction,
        class: characterClass,
        ownerId,
        realmServerId,
      })
      .returning({ id: characters.id });

    if (specializations.length > 0) {
      const specializationsValues = specializations.map((specialization) => ({
        characterId: newCharacter.id,
        name: specialization.name,
        gearScore: specialization.gearScore.toString(),
      }));
      await tx.insert(characterSpecializations).values(specializationsValues);
    }

    if (preferredInstanceIds.length > 0) {
      const preferredInstancesValues = preferredInstanceIds.map(
        (preferredInstanceId) => ({
          characterId: newCharacter.id,
          instanceId: preferredInstanceId,
        })
      );

      await tx
        .insert(charactersPreferredInstances)
        .values(preferredInstancesValues);
    }

    if (savedInstanceIds.length > 0) {
      const savedInstancesValues = savedInstanceIds.map((savedInstanceId) => ({
        characterId: newCharacter.id,
        instanceId: savedInstanceId,
      }));

      await tx.insert(charactersSavedInstances).values(savedInstancesValues);
    }

    return newCharacter;
  });
};

export const getCharactersByUserId = async (
  ownerId: string,
  page: number,
  pageSize: number,
  filterModel: { field: string; operator: string; value: string }[],
  sortModel: { field: string; sort: string }[] | null,
  columnMapping: Record<string, string>
) => {
  const db = await getDatabase();

  const query = db
    .select()
    .from(characters)
    .where(eq(characters.ownerId, ownerId))
    .$dynamic();
  const tableConfig = getTableConfig(characters);

  const result = await getEntities(
    query,
    tableConfig,
    page,
    pageSize,
    filterModel,
    sortModel,
    columnMapping
  );

  return result;
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
