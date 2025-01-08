export interface Character {
  faction: 'Alliance' | 'Horde';
  name: string;
  id: string | undefined;
  characterClass: string;
  ownerId: string | undefined;
  realmServerId: string;
  charactersPreferredInstances: string[];
  charactersSavedInstances: string[];
  specializations: { id: string; name: string }[];
}
