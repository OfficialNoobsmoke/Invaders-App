import { CharacterResponseDto } from './interfaces/character';
import { Pagination } from '../../shared/interfaces/pagination';

export const fromDBManyToCharacters = (dbResult: {
  page: number;
  limit: number;
  count: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>[];
}) => {
  const mergedArray: CharacterResponseDto[] = [];
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
      charactersPreferredInstances,
      charactersSavedInstances,
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
    limit: dbResult.limit,
    count: dbResult.count,
    data: mergedArray,
  } satisfies Pagination<CharacterResponseDto>;
};
