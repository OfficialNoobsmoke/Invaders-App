import { CharacterDto } from './characterDtod';

export type UserDto = {
  discordId: string;
  username: string;
  highestRole: string;
  factions: string[];
  displayName: string | undefined;
  characters: CharacterDto[] | undefined;
};