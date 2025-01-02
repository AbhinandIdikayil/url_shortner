import { ShortUrlDoc } from "../model/ShortUrlModel";
import { User } from "../model/UserModel";
import { CreateUrlRepo, IRegister } from "./User";


export interface AuthAndUrlIRepo {
    create(data: IRegister): Promise<User>
    findByGoogleId(googleId: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
    createShortUrl(data: CreateUrlRepo): Promise<ShortUrlDoc>
    findByAlias(alias: string): Promise<ShortUrlDoc | null>
}

