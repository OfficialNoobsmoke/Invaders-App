export type CharacterDto = {
  name: string;
  class: string;
  mainSpec: string;
  gearScoreMainSpec: number;
  offSpec: string | undefined;
  gearScoreOffSpec: number | undefined;
  skill: number | undefined;
  faction: "Alliance" | "Horde";
};
