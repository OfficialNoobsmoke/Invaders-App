export interface CreateCharacter {
  name: string;
  faction: string;
  class: string;
  realmServerId: string;
  specializations: Specialization[];
  charactersPreferredInstances: string[];
  charactersSavedInstances: string[];
}

export interface Specialization {
  name: string;
  gearScore: number;
}
