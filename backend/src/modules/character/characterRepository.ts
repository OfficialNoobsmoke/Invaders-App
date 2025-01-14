import { aliasedTable, eq } from 'drizzle-orm';
import { getDatabase } from '../../app/database/database';
import {
  characters,
  charactersPreferredInstances,
  charactersSavedInstances,
  characterSpecializations,
  realmServers,
  instances,
} from '../../app/database/schema';
import { fromDBManyToCharacters } from './characterMapper';
import { getEntities } from '../../shared/repositories/genericRepository';
import { QueryConfiguration } from '../../shared/interfaces/queryConfiguration';
import { Class } from './interfaces/class';
import { Specialization } from './interfaces/specialization';
import { Faction } from './interfaces/faction';

export const createCharacter = async (
  name: string,
  faction: Faction,
  characterClass: Class,
  ownerId: string,
  realmServerId: string,
  specializations: { name: Specialization; gearScore: number }[] = [],
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
  limit: number,
  filterModel: { field: string; operator: string; value: string }[],
  sortModel: { field: string; sort: string }[]
) => {
  const charactersPreferredInstancesInstance = aliasedTable(
    instances,
    'charactersPreferredInstancesInstance'
  );
  const charactersSavedInstancesInstance = aliasedTable(
    instances,
    'charactersSavedInstancesInstance'
  );
  const queryConfiguration: QueryConfiguration = {
    table: characters,
    columns: {
      id: characters.id,
      name: characters.name,
      faction: characters.faction,
      class: characters.class,
      createdAt: characters.createdAt,
      ownerId: characters.ownerId,
      specializationId: characterSpecializations.id,
      specializationName: characterSpecializations.name,
      specializationGearScore: characterSpecializations.gearScore,
      charactersPreferredInstances: charactersPreferredInstancesInstance.name,
      charactersSavedInstances: charactersSavedInstancesInstance.name,
      realmServerName: realmServers.name,
      realmServerId: realmServers.id,
    },
    where: eq(characters.ownerId, ownerId),
    totalCountAggregate: characters.id,
    joins: [
      {
        table: characterSpecializations,
        type: 'left',
        condition: eq(characters.id, characterSpecializations.characterId),
      },
      {
        table: charactersPreferredInstances,
        type: 'left',
        condition: eq(characters.id, charactersPreferredInstances.characterId),
      },
      {
        table: charactersSavedInstances,
        type: 'left',
        condition: eq(characters.id, charactersSavedInstances.characterId),
      },
      {
        table: realmServers,
        type: 'left',
        condition: eq(characters.realmServerId, realmServers.id),
      },
      {
        table: charactersPreferredInstancesInstance,
        type: 'left',
        condition: eq(
          charactersPreferredInstances.instanceId,
          charactersPreferredInstancesInstance.id
        ),
      },
      {
        table: charactersSavedInstancesInstance,
        type: 'left',
        condition: eq(
          charactersSavedInstances.instanceId,
          charactersSavedInstancesInstance.id
        ),
      },
    ],
  };

  const queryResult = await getEntities(
    queryConfiguration,
    page,
    limit,
    filterModel,
    sortModel
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
    faction: Faction;
    class: Class;
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
