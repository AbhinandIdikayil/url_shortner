import { User } from "../model/UserModel";


export interface AuthAndUrlIService {
    signin(id_token: string): Promise<{ email: string, token: string, name: string }>
}