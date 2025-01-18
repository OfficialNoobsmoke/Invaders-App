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
  charactersPreferredInstances: Instance[];
  charactersSavedInstances: Instance[];
}

export interface Instance {
  id: string;
  name: string;
  size: number;
}
