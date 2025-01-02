import { User } from "../model/UserModel";
import { CreateUrl } from "./User";


export interface AuthAndUrlIService {
    signin(id_token: string): Promise<{ email: string, token: string, name: string }>
    createShortUrl(data:CreateUrl): Promise<{shortUrl: string, createdAt: string}>
    redirectShortUrl(alias: string): Promise<{longUrl: string}>
}