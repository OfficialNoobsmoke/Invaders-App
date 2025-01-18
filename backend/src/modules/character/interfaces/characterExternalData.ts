export interface WarmaneArmoryCharacterData {
  name: string;
  realm: string;
  online: boolean;
  level: string;
  faction: string;
  gender: string;
  race: string;
  racemask: number;
  class: string;
  classmask: number;
  honorablekills: string;
  guild: string;
  achievementpoints: string;
  equipment: WarmaneArmoryEquipmentItem[];
  talents: WarmaneArmoryTalent[];
  professions: WarmaneArmoryProfession[];
  pvpteams: PvPTeam[];
}

interface WarmaneArmoryEquipmentItem {
  name: string;
  item: string;
  transmog: string;
}

export interface WarmaneArmoryTalent {
  tree: string;
  points: [number, number, number];
}

interface WarmaneArmoryProfession {
  name: string;
  skill: string;
}

interface PvPTeam {
  type: string;
  name: string;
  rating: string;
  rank: string;
}

export interface CharacterExternalData {
  class: string;
  faction: string;
}
