import jwt, { JwtPayload } from 'jsonwebtoken'
import { CONFIG } from '../constants/env';

export const verify = (token: string): { id: string } => {
    const decoded = jwt.verify(token, CONFIG.JWT_SECRET) as JwtPayload;
    if (decoded && decoded.id) {
        return { id: decoded.id };
    }
    throw new Error('Invalid token');
}