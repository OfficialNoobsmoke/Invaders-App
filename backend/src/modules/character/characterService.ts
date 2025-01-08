import characterRepository from './characterRepository';

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
  pageSize: number,
  filterModel: { field: string; operator: string; value: string }[],
  sortModel: { field: string; sort: string }[]
) => {
  return characterRepository.getCharactersByUserId(
    ownerId,
    page,
    pageSize,
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
    faction: 'Alliance' | 'Horde';
    characterClass: string;
  }>
) => {
  return characterRepository.updateCharacter(id, updatedData);
};

export const deleteCharacterById = async (id: string) => {
  return characterRepository.deleteCharacterById(id);
};

export default {
  createCharacter,
  getCharactersByUserId,
  getCharacterById,
  updateCharacter,
  deleteCharacterById,
};
