import { Profile } from 'passport-discord';
import userRepository from '../repositories/userRepository';
import { getGuildMemberDetails } from '../utils/discordApiWrapper';
import { IUser } from '../interfaces/IUser';
import passport from 'passport';
import { discordTokenRepository } from '../repositories/discordTokenRepository';
import { hmacHashJwt } from '../utils/cryptography';

export const createDiscordTokenForUser = async (
  parentId: string,
  refreshToken: string
) => {
  await discordTokenRepository.createToken({
    refreshToken: hmacHashJwt(refreshToken),
    accessTokenExpiresAt: new Date(Date.now() + 3600000), //1 hour
    refreshTokenExpiresAt: new Date(Date.now() + 604800000), //1 week
    parentId,
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
      (guild) => guild.id === process.env.DISCORD_INVADERS_SERVER_ID!
    ) ?? false
  );
};

const getUserData = async (accessToken: string, profile: Profile) => {
  return {
    isInDiscord: isInInvadersDiscord(profile),
    guildMemberDetails: await getGuildMemberDetails(
      accessToken,
      process.env.DISCORD_INVADERS_SERVER_ID!
    ),
  };
};

export const authenticate = () => {
  return passport.authenticate('discord');
};

export const callBack = () => {
  return passport.authenticate('discord', {
    failureRedirect: '/api/auth/failure',
  });
};