import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET!;

export const generateToken = (
  userId: string
): { bearerToken: string; expiresAt: Date } => {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  return {
    bearerToken: jwt.sign({ userId }, SECRET_KEY, {
      expiresIn: '1h',
    }),
    expiresAt,
  };
};

export const verifyToken = (token: string): { userId: string } | null => {
  try {
    return jwt.verify(token, SECRET_KEY) as { userId: string };
  } catch {
    return null;
  }
};

export default { generateToken, verifyToken };
