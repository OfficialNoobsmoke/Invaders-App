import crypto from 'crypto';

export const hmacHashJwt = (jwtToken: string) => {
  const hmac = crypto.createHmac('sha256', process.env.HASH_SECRET!);
  hmac.update(jwtToken);
  return hmac.digest('base64');
};
