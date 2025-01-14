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
  equipment: EquipmentItem[];
  talents: Talent[];
  professions: Profession[];
  pvpteams: PvPTeam[];
}

interface EquipmentItem {
  name: string;
  item: string;
  transmog: string;
}

interface Talent {
  tree: string;
  points: [number, number, number];
}

interface Profession {
  name: string;
  skill: string;
}

interface PvPTeam {
  type: string;
  name: string;
  rating: string;
  rank: string;
}
