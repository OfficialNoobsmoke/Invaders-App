import { fetcher } from '../../_fetcher';

export type UserDto = {
  discordId: string;
  username: string;
};

const urlBuilder = () => {
  return `http://localhost:4000/api/auth/discord/redirect`;
};

export const AUTH_UserReadController_getUser = (
) => {
  return fetcher
    .call(urlBuilder(), {
      method: "GET",
    })
    .then<UserDto>(async (value) => {
      if (!value.ok) {
        const errorResponse = await value.json();
        throw new Error(errorResponse.message || "Failed to fetch user");
      }

      const user: UserDto = await value.json();
      return user;
    });
};
