import { CharacterResponseDto } from '../interfaces/character';
import { Pagination } from '../interfaces/pagination';

export const fromDBManyToCharacters = (dbResult: {
  page: number;
  pageSize: number;
  count: number;
  data: (
    | {
        [x: string]: string;
      }
    | {
        [x: string]: string;
      }
    | {
        [x: string]: string;
      }
  )[];
}) => {
  const mergedArray: CharacterResponseDto[] = [];
  dbResult.data.forEach((record) => {
    const {
      id,
      name,
      faction,
      class: charClass,
      ownerId,
      realmServerId,
      createdAt,
      specializationId,
      specializationName,
      specializationGearScore,
      charactersPreferredInstances,
      charactersSavedInstances,
    } = record;

    let existingEntry = mergedArray.find((item) => item.id === id);

    if (!existingEntry) {
      existingEntry = {
        id,
        name,
        faction,
        class: charClass,
        ownerId,
        realmServerId,
        createdAt,
        specializations: [],
        gearScore: [],
        charactersPreferredInstances: [],
        charactersSavedInstances: [],
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
      }
    }

    if (charactersPreferredInstances) {
      if (
        !existingEntry.charactersPreferredInstances.includes(
          charactersPreferredInstances
        )
      ) {
        existingEntry.charactersPreferredInstances.push(
          charactersPreferredInstances
        );
      }
    }

    if (charactersSavedInstances) {
      if (
        !existingEntry.charactersSavedInstances.includes(
          charactersSavedInstances
        )
      ) {
        existingEntry.charactersSavedInstances.push(charactersSavedInstances);
      }
    }
  });
  return {
    page: dbResult.page,
    pageSize: dbResult.pageSize,
    count: dbResult.count,
    data: mergedArray,
  } satisfies Pagination<CharacterResponseDto>;
};
