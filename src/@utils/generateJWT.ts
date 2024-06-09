import { env } from '@/env';
import { sign } from 'jsonwebtoken';

export function generateJWT(user: string) {
    const payload = { user };
    return sign(payload, env.JWT_ACCESS, { expiresIn: '15m' });
}
