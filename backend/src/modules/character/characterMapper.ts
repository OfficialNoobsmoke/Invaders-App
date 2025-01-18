import { ReadCharacter } from './interfaces/readCharacter';
import { Pagination } from '../../shared/interfaces/pagination';
import {
  CharacterExternalData,
  WarmaneArmoryCharacterData,
} from './interfaces/characterExternalData';

export const fromDBManyToCharacters = (dbResult: {
  page: number;
  limit: number;
  count: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>[];
}) => {
  const mergedArray: ReadCharacter[] = [];
  dbResult.data.forEach((record) => {
    const {
      id,
      name,
      faction,
      class: charClass,
      ownerId,
      realmServerName,
      createdAt,
      specializationId,
      specializationName,
      specializationGearScore,
      charactersPreferredInstancesId,
      charactersPreferredInstances,
      charactersPreferredInstancesSize,
      charactersSavedInstancesId,
      charactersSavedInstances,
      charactersSavedInstancesSize,
      realmServerId,
    } = record;

    let existingEntry = mergedArray.find((item) => item.id === id);

    if (!existingEntry) {
      existingEntry = {
        id,
        name,
        faction,
        class: charClass,
        ownerId,
        realmServerName,
        createdAt,
        specializations: [],
        gearScore: [],
        charactersPreferredInstances: [],
        charactersSavedInstances: [],
        realmServerId,
      };
      mergedArray.push(existingEntry);
    }

    if (specializationId && specializationName && specializationGearScore) {
      if (
        !existingEntry.specializations.some((x) => x.id === specializationId)
      ) {
        existingEntry.specializations.push({
          id: specializationId,
          name: specializationName,
        });
        existingEntry.gearScore.push({
          id: specializationId,
          value: specializationGearScore,
        });
      }
    }

    if (charactersPreferredInstances) {
      if (
        !existingEntry.charactersPreferredInstances.some(
          (x) => x.id === charactersPreferredInstancesId
        )
      ) {
        existingEntry.charactersPreferredInstances.push({
          id: charactersPreferredInstancesId,
          name: charactersPreferredInstances,
          size: charactersPreferredInstancesSize,
        });
      }
    }

    if (charactersSavedInstances) {
      if (
        !existingEntry.charactersSavedInstances.some(
          (x) => x.id === charactersSavedInstancesId
        )
      ) {
        existingEntry.charactersSavedInstances.push({
          id: charactersSavedInstancesId,
          name: charactersSavedInstances,
          size: charactersSavedInstancesSize,
        });
      }
    }
  });
  return {
    page: dbResult.page,
    limit: dbResult.limit,
    count: dbResult.count,
    data: mergedArray,
  } satisfies Pagination<ReadCharacter>;
};

export const fromWarmaneArmoryCharacterDataToCharacterExternalData = (
  characterData: WarmaneArmoryCharacterData
) => {
  return {
    class: characterData.class,
    faction: characterData.faction,
  } as CharacterExternalData;
};
