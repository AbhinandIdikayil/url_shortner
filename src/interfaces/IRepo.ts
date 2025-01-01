import { User } from "../model/UserModel";
import { IRegister } from "./User";


export interface AuthAndUrlIRepo {
    create(data: IRegister): Promise<User>
    findByGoogleId(googleId: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
}

