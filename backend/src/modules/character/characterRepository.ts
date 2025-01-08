import { eq } from 'drizzle-orm';
import { getDatabase } from '../../libs/database/database';
import {
  characters,
  charactersPreferredInstances,
  charactersSavedInstances,
  characterSpecializations,
  //characterDetails,
} from '../../libs/database/schema';
import { fromDBManyToCharacters } from './characterMapper';
import { getEntities } from '../../libs/repositories/genericRepository';
import { CharacterResponseDto } from './interfaces/character';
import { PgColumn, PgTable } from 'drizzle-orm/pg-core';

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
  sortModel: { field: string; sort: string }[] | null
) => {
  const db = await getDatabase();

  type AllowedCharacterFields = Pick<
    CharacterResponseDto,
    | 'name'
    | 'faction'
    | 'class'
    | 'realmServerId'
    | 'ownerId'
    | 'createdAt'
    | 'specializations'
    | 'gearScore'
    | 'charactersPreferredInstances'
    | 'charactersSavedInstances'
  >;

  const columnMapping: Record<
    keyof AllowedCharacterFields,
    { table: PgTable; column: PgColumn }
  > = {
    name: { table: characters, column: characters.name },
    faction: { table: characters, column: characters.faction },
    class: { table: characters, column: characters.class },
    realmServerId: {
      table: characters,
      column: characters.realmServerId,
    },
    createdAt: {
      table: characters,
      column: characters.createdAt,
    },
    ownerId: { table: characters, column: characters.ownerId },
    specializations: {
      table: characterSpecializations,
      column: characterSpecializations.name,
    },
    gearScore: {
      table: characterSpecializations,
      column: characterSpecializations.gearScore,
    },
    charactersPreferredInstances: {
      table: charactersPreferredInstances,
      column: charactersPreferredInstances.instanceId,
    },
    charactersSavedInstances: {
      table: charactersSavedInstances,
      column: charactersSavedInstances.instanceId,
    },
  };

  const query = db
    .select({
      id: characters.id,
      name: characters.name,
      faction: characters.faction,
      class: characters.class,
      ownerId: characters.ownerId,
      realmServerId: characters.realmServerId,
      createdAt: characters.createdAt,
      specializationId: characterSpecializations.id,
      specializationName: characterSpecializations.name,
      specializationGearScore: characterSpecializations.gearScore,
      charactersPreferredInstances: charactersPreferredInstances.instanceId,
      charactersSavedInstances: charactersSavedInstances.instanceId,
    })
    .from(characters)
    .leftJoin(
      charactersPreferredInstances,
      eq(charactersPreferredInstances.characterId, characters.id)
    )
    .leftJoin(
      characterSpecializations,
      eq(characterSpecializations.characterId, characters.id)
    )
    .leftJoin(
      charactersSavedInstances,
      eq(charactersSavedInstances.characterId, characters.id)
    )
    .where(eq(characters.ownerId, ownerId))
    .$dynamic();

  const queryResult = await getEntities(
    query,
    page,
    pageSize,
    filterModel,
    sortModel,
    columnMapping
  );

  const result = fromDBManyToCharacters(queryResult);

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
