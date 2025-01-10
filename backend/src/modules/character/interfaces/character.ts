export interface CharacterResponseDto {
  id: string;
  name: string;
  faction: string;
  class: string;
  ownerId: string;
  realmServerName: string;
  createdAt: string;
  specializations: {
    id: string;
    name: string;
  }[];
  gearScore: {
    id: string;
    value: number;
  }[];
  charactersPreferredInstances: string[];
  charactersSavedInstances: string[];
}
