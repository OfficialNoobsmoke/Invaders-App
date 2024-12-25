import { Profile } from 'passport-discord';
import userRepository from '../repositories/userRepository';
import generalConstants from '../constants/general';
import { tokenRepository } from '../repositories/tokenRepository';
import general from '../constants/general';
import { getGuildMemberDetails } from '../utils/discordApiWrapper';
import { IUser } from '../interfaces/IUser';

export const createDiscordTokenForUser = async (
  userId: string,
  accessToken: string,
  refreshToken: string
) => {
  await tokenRepository.createToken({
    userId: userId,
    tokenType: 'discord',
    accessToken: accessToken,
    refreshToken: refreshToken,
    accessTokenExpiresAt: new Date(Date.now() + 3600000), //1 hour
    refreshTokenExpiresAt: new Date(Date.now() + 604800000), //1 week
  });
};

export const getOrCreateUserFromProfile = async (
  accessToken: string,
  profile: Profile
) => {
  const user = await userRepository.getUserByDiscordId(profile.id);

  if (!user) {
    return await createUser(accessToken, profile);
  }

  return await updateUser(accessToken, profile, user);
};

const createUser = async (accessToken: string, profile: Profile) => {
  const { isInDiscord, guildMemberDetails } = await getUserData(
    accessToken,
    profile
  );

  return await userRepository.createUser({
    discordId: profile.id,
    username: profile.username,
    email: profile.email,
    displayName: guildMemberDetails.nick ?? profile.global_name,
    isInDiscord,
  });
};

const updateUser = async (
  accessToken: string,
  profile: Profile,
  user: IUser
) => {
  const { isInDiscord, guildMemberDetails } = await getUserData(
    accessToken,
    profile
  );

  return await userRepository.updateUser(user.id, {
    isInDiscord,
    displayName: guildMemberDetails.nick ?? profile.global_name,
    lastLogin: new Date(Date.now()),
  });
};

const isInInvadersDiscord = (profile: Profile) => {
  return (
    profile.guilds?.some(
      (guild) => guild.id === generalConstants.DISCORD_INVADERS_SERVER_ID
    ) ?? false
  );
};

const getUserData = async (accessToken: string, profile: Profile) => {
  return {
    isInDiscord: isInInvadersDiscord(profile),
    guildMemberDetails: await getGuildMemberDetails(
      accessToken,
      general.DISCORD_INVADERS_SERVER_ID
    ),
  };
};
