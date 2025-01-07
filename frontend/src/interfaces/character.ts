export interface Character {
  faction: 'Alliance' | 'Horde';
  name: string;
  id: string | undefined;
  characterClass: string;
  ownerId: string | undefined;
  realmServerId: string;
  charactersPreferredInstances: string[];
  charactersSavedInstances: string[];
  specializations: { name: string; gearScore: number }[];
}
