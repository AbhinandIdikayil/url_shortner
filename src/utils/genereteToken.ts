import jwt from 'jsonwebtoken'
import { CONFIG } from '../constants/env'

export const generateToken = (id:any) => {
    return jwt.sign(id,CONFIG.JWT_SECRET,{expiresIn:'1d'})
}