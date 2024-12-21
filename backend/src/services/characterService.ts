import characterRepository from '../repositories/characterRepository';

export const createCharacter = async (
  name: string,
  faction: 'Alliance' | 'Horde',
  characterClass: string,
  ownerId: string,
  realmServerId: string
) => {
  return characterRepository.createCharacter(
    name,
    faction,
    characterClass,
    ownerId,
    realmServerId
  );
};

export const getCharactersByUserId = async (ownerId: string) => {
  return characterRepository.getCharactersByUserId(ownerId);
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
