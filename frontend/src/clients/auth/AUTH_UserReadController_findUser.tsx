import { fetcher } from '../../_fetcher';

export type UserDto = {
  discordId: string;
  username: string;
  factions: string[];
  highestRole: string;
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
