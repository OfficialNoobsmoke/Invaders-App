import { Request, Response } from 'express';
import { IRequestUser } from '../interfaces/IRequestUser';
import tokenService from '../services/tokenService';

export const generateToken = async (req: Request, res: Response) => {
  const user = req.user as IRequestUser;
  if (!user) return res.redirect('http://localhost:4001/');
  const { tokenData, refreshTokenData } = await tokenService.generateToken(
    user.id
  );
  console.log(
    new Date(
      JSON.parse(
        Buffer.from(tokenData.accessToken.split('.')[1], 'base64').toString()
      ).exp * 1000
    )
  ); //TODO move this to the middleware
  const cookie = {
    accessToken: tokenData.accessToken,
    refreshToken: refreshTokenData.accessToken,
    userId: user.id,
  };
  res
    .cookie('user_data', cookie, {
      signed: true,
      httpOnly: process.env.NODE_ENV !== 'dev',
      secure: true,
    })
    .redirect(`http://localhost:4001/home`);
};

export default { generateToken };
