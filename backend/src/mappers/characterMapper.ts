import { CharacterResponseDto, DBCharacter } from '../interfaces/character';

export const fromDBToCharacter = (userCharacter: DBCharacter) => {
  return {
    faction: userCharacter.faction,
    name: userCharacter.name,
    id: userCharacter.id,
    class: userCharacter.class,
    ownerId: userCharacter.ownerId,
    realmServerId: userCharacter.realmServerId,
    specializations: userCharacter.specializations.map((specialization) => ({
      name: specialization.name,
      id: specialization.id,
      gearScore: Number(specialization.gearScore),
    })),
    charactersPreferredInstances:
      userCharacter.charactersPreferredInstances.map(
        (instance) => instance.instanceId
      ),
    charactersSavedInstances: userCharacter.charactersSavedInstances.map(
      (instance) => instance.instanceId
    ),
  } as CharacterResponseDto;
};

export const fromDBManyToCharacters = (userCharacters: DBCharacter[]) => {
  return userCharacters.map(fromDBToCharacter);
};
