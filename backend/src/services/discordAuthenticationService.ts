import { Profile } from 'passport-discord';
import userRepository from '../repositories/userRepository';
import generalConstants from '../constants/general';
import { tokenRepository } from '../repositories/tokenRepository';

export const getDataFromProfile = async (
  profile: Profile,
  accessToken: string,
  refreshToken: string
) => {
  let user = await userRepository.getUserByDiscordId(profile.id);
  const isInDiscord =
    profile.guilds?.some(
      (guild) => guild.id === generalConstants.DISCORD_INVADERS_SERVER_ID
    ) ?? false;
  if (!user) {
    user = await userRepository.createUser({
      discordId: profile.id,
      username: profile.username,
      email: profile.email,
      displayName: profile.global_name,
      isInDiscord,
    });
  } else {
    if (!user.isInDiscord && isInDiscord) {
      user.isInDiscord = isInDiscord;
    }
    await userRepository.updateUser(user.id, { isInDiscord });
    await tokenRepository.createToken({
      userId: user.id,
      tokenType: 'discord',
      bearerToken: accessToken,
      refreshToken,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    });
  }
  return user;
};
