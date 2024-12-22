import { Profile } from 'passport-discord';
import userRepository from '../repositories/userRepository';

export const getDataFromProfile = async (
  profile: Profile,
  accessToken: string,
  refreshToken: string
) => {
  let user = await userRepository.getUserByDiscordId(profile.id);
  const isInDiscord =
    profile.guilds?.some((guild) => guild.id === '799311685507874827') ?? false; //Invaders Discord id
  if (!user) {
    user = await userRepository.createUser({
      discordId: profile.id,
      username: profile.username,
      email: profile.email,
    });
  }
  return user;
};
