import { Request, Response } from 'express';
import { IUser } from '../interfaces/IUser';
import authentication from '../utils/authentication';
import { tokenRepository } from '../repositories/tokenRepository';
export const generateToken = async (req: Request, res: Response) => {
  const user = req.user as IUser;
  if (!user) return res.redirect('http://localhost:4001/');
  const tokenData = authentication.generateToken(user.id);
  await tokenRepository.createToken({
    userId: user.id,
    tokenType: 'jwt',
    bearerToken: tokenData.bearerToken,
    expiresAt: tokenData.expiresAt,
  });
  const cookie = {
    bearerToken: tokenData.bearerToken,
    userId: user.id,
  };
  res
    .cookie('bearer_token', cookie, {
      signed: true,
      httpOnly: process.env.NODE_ENV !== 'dev',
      secure: true,
    })
    .redirect(`http://localhost:4001/home`);
};

export default { generateToken };
