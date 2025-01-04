export type DBCharacter = {
  faction: 'Alliance' | 'Horde';
  name: string;
  id: string;
  class: string;
  createdAt: Date;
  ownerId: string;
  totalCount: number;
  realmServerId: string;
  charactersPreferredInstances: { characterId: string; instanceId: string }[];
  charactersSavedInstances: { characterId: string; instanceId: string }[];
  specializations: {
    name: string;
    id: string;
    createdAt: Date;
    gearScore: string;
    characterId: string | null;
  }[];
};
export type CharacterResponseDto = {
  faction: 'Alliance' | 'Horde';
  name: string;
  id: string;
  class: string;
  ownerId: string;
  realmServerId: string;
  charactersPreferredInstances: string[];
  charactersSavedInstances: string[];
  specializations: {
    name: string;
    id: string;
    gearScore: number;
  }[];
};
