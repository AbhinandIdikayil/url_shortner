import { AuthAndUrlIRepo } from "../interfaces/IRepo";
import { CreateUrl, CreateUrlRepo, IRegister } from "../interfaces/User";
import { ShortUrlDoc, ShortUrlModel } from "../model/ShortUrlModel";
import { User, UserModel } from "../model/UserModel";


export class AuthAndUrlRepo implements AuthAndUrlIRepo {
    async create(data: IRegister): Promise<User> {
        return await UserModel.create(data)
    }
    async findByEmail(email: string): Promise<User | null> {
        return await UserModel.findOne({ email })
    }
    async findByGoogleId(googleId: string): Promise<User | null> {
        return await UserModel.findOne({ googleId })
    }
    async createShortUrl(data: CreateUrlRepo): Promise<ShortUrlDoc> {
        return await ShortUrlModel.create(data)
    }
    async findByAlias(alias: string): Promise<ShortUrlDoc | null> {
        return await ShortUrlModel.findOne({alias})
    }
}