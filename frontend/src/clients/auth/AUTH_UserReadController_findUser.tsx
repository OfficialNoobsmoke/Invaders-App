import { fetcher } from '../../_fetcher';

export type UserDto = {
  id: string;
  discordId: string;
  username: string;
  factions: string[];
  highestRole: string;
  displayName: string | undefined;
  characters: CharacterDto[] | undefined;
};

export type CharacterDto = {
  id: string;
  name: string;
  class: string;
  mainSpec: string;
  gearScoreMainSpec: number;
  offSpec: string | undefined;
  gearScoreOffSpec: number | undefined;
  skill: number | undefined;
  faction: 'Alliance' | 'Horde';
};

const urlBuilder = () => {
  return `http://localhost:4000/api/auth/discord/user`;
};

export const AUTH_UserReadController_getUser = () => {

  return fetcher
    .call(urlBuilder(), {
      method: 'GET',
      credentials: 'include', // Ensure cookies are included
    })
    .then<UserDto>(async (value) => {
      if (!value.ok) {
        const errorResponse = await value.json();
        console.error('Error fetching user:', errorResponse); // Debugging log
        throw new Error(errorResponse.message || 'Failed to fetch user');
      }

      const user: UserDto = await value.json();
      return user;
    });
};


