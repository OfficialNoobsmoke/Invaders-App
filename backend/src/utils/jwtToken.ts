import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET!;

export const generate = (
  userId: string,
  expiresIn: number
): { accessToken: string; expiresAt: Date } => {
  return {
    accessToken: jwt.sign({ userId }, SECRET_KEY, {
      expiresIn,
    }),
    expiresAt: new Date(Date.now() + expiresIn),
  };
};

export const verify = (token: string): { userId: string } | null => {
  try {
    return jwt.verify(token, SECRET_KEY) as { userId: string };
  } catch {
    return null;
  }
};

export default { generateToken: generate, verifyToken: verify };
