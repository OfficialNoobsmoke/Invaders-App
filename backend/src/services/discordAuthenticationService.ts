import { Profile } from 'passport-discord';
import userRepository from '../repositories/userRepository';
import { tokenRepository } from '../repositories/tokenRepository';
import { getGuildMemberDetails } from '../utils/discordApiWrapper';
import { IUser } from '../interfaces/IUser';
import passport from 'passport';
import { Request, Response } from 'express';
import { discordTokenRepository } from '../repositories/discordTokenRepository';
import { getRedirectUrlRoute } from '../utils/redirectUrlRouteBuilder';
import { frontEndRoutes, general } from '../constants/constants';
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

export const logOut = async (req: Request, res: Response) => {
  const authHeader = req.headers['cookie'];
  if (!authHeader) {
    return res.sendStatus(204);
  }

  const userData = req.signedCookies[general.AUTH_COOKIE];
  if (!userData) {
    return res.sendStatus(204);
  }
  const userId = userData.userId;
  const oldRefreshToken = userData.authentication.refreshToken;
  res.setHeader('Clear-Site-Data', '"cookies"');
  res.status(200).redirect(getRedirectUrlRoute(frontEndRoutes.HOME_PAGE));
  res.end();
  await tokenRepository.deleteTokenByRefreshToken(userId, oldRefreshToken);
};
