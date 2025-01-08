import crypto from 'crypto';

export const hmacHashString = (value: string) => {
  const hmac = crypto.createHmac('sha256', process.env.HASH_SECRET!);
  hmac.update(value);
  return hmac.digest('base64');
};
