import axios from 'axios';
import { RESTGetAPIGuildMemberResult } from 'discord-api-types/v10';

export const getGuildMemberDetails = async (
  accessToken: string,
  guildId: string
): Promise<RESTGetAPIGuildMemberResult> => {
  const response = await axios.get(
    `https://discord.com/api/v10/users/@me/guilds/${guildId}/member`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};
