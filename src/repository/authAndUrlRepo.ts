import { AuthAndUrlIRepo } from "../interfaces/IRepo";
import { IRegister } from "../interfaces/User";
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
}