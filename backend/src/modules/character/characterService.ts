import { externalRoutes } from '../../shared/constants/constants';
import httpClient from '../../shared/utils/httpClient';
import interpolate from '../../shared/utils/interpolate';
import characterRepository from './characterRepository';
import { Class } from './interfaces/class';
import { Faction } from './interfaces/faction';
import { Specialization } from './interfaces/specialization';
import { getRealmServerById } from '../../shared/repositories/realmServerRepository';
import { ExternalRequestError } from '../../shared/exceptions/externalRequestError';

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
  return characterRepository.createCharacter(
    name,
    faction,
    characterClass,
    ownerId,
    realmServerId,
    specializations,
    preferredInstanceIds,
    savedInstanceIds
  );
};

export const getCharactersByUserId = async (
  ownerId: string,
  page: number,
  limit: number,
  filterModel: { field: string; operator: string; value: string }[],
  sortModel: { field: string; sort: string }[]
) => {
  return characterRepository.getCharactersByUserId(
    ownerId,
    page,
    limit,
    filterModel,
    sortModel
  );
};

export const getCharacterById = async (id: string) => {
  return characterRepository.getCharacterById(id);
};

export const updateCharacter = async (
  id: string,
  updatedData: Partial<{
    name: string;
    faction: Faction;
    characterClass: Class;
  }>
) => {
  return characterRepository.updateCharacter(id, updatedData);
};

export const deleteCharacterById = async (id: string) => {
  return characterRepository.deleteCharacterById(id);
};

export const getCharacterFromExternalSource = async (
  characterName: string,
  realmServerId: string
) => {
  const { name } = await getRealmServerById(realmServerId);
  const maxRetries = 3;
  let attempts = 0;
  while (attempts < maxRetries) {
    attempts++;

    try {
      const response = await httpClient.get(
        interpolate(
          externalRoutes.WARMANE_ARMORY_API_CHARACTER_PROFILE,
          characterName,
          extractRealmNameFromRealmServerName(name)
        )
      );

      if (response.data.error === 'Too many requests.') {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        continue;
      }
      return response.data;
    } catch (error) {
      console.error(`Attempt ${attempts} failed:`, error);
    }
  }

  throw new ExternalRequestError(
    'Failed to fetch character data from external source'
  );
};

const extractRealmNameFromRealmServerName = (realmServerName: string) => {
  return realmServerName.split('-')[1];
};

export default {
  createCharacter,
  getCharactersByUserId,
  getCharacterById,
  updateCharacter,
  deleteCharacterById,
  getCharacterFromExternalSource,
};
