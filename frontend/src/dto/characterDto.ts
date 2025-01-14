export interface ReadCharacter {
  id: string;
  name: string;
  faction: string;
  class: string;
  ownerId: string;
  realmServerName: string;
  realmServerId: string;
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

export interface CreateCharacter {
  name: string;
  faction: string;
  class: string;
  realmServerId: string;
  specializations: {
    name: string;
    gearScore: number;
  }[];
  charactersPreferredInstances: string[];
  charactersSavedInstances: string[];
}
