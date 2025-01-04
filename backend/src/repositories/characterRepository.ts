import { and, Column, eq, gt, like, lt, SQL } from 'drizzle-orm';
import { getDatabase } from '../database/database';
import {
  characters,
  charactersPreferredInstances,
  charactersSavedInstances,
  characterSpecializations,
} from '../database/schema';
import { fromDBManyToCharacters } from '../mappers/characterMapper';
import { DBCharacter } from '../types/character';
import { getTableConfig } from 'drizzle-orm/pg-core';

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
  page: number = 1,
  pageSize: number = 25,
  filterModel: { field: string; operator: string; value: string }[]
) => {
  const db = await getDatabase();
  const offset = page * pageSize;
  let whereConditions = [eq(characters.ownerId, ownerId)];
  const validColumns = getTableConfig(characters).columns.map(
    (column) => column.name
  );
  let filterWhereConditions: SQL<unknown>[] = [];
  if (filterModel) {
    const filtersArray = Object.values(filterModel);
    filterWhereConditions = filtersArray
      .map((filter) => {
        if (!validColumns.includes(filter.field) || !filter.value) {
          return null;
        }

        const column = getTableConfig(characters).columns.find(
          (col) => col.name === filter.field
        ) as Column;

        switch (filter.operator) {
          case 'contains':
            return like(column, `%${filter.value}%`);
          case '>':
            return gt(column, filter.value);
          case '<':
            return lt(column, filter.value);
          case '=':
          case 'is':
            return eq(column, filter.value);
          default:
            return null;
        }
      })
      .filter(Boolean) as SQL<unknown>[];

    whereConditions = whereConditions.concat(filterWhereConditions);
  }
  const userCharacters = (await db.query.characters.findMany({
    where: and(...whereConditions),
    with: {
      specializations: true,
      charactersPreferredInstances: true,
      charactersSavedInstances: true,
    },
    limit: pageSize,
    offset,
    extras: {
      totalCount: db
        .$count(characters, and(...whereConditions))
        .as('totalCount'),
    },
  })) as DBCharacter[];

  return {
    page,
    pageSize,
    count: +userCharacters[0]?.totalCount || 0,
    data: fromDBManyToCharacters(userCharacters),
  };
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
