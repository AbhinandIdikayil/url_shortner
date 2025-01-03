import { IAnalytic, IAnalyticsDoc } from "../model/AnalyticsModel";
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

export interface IAnalyticsRepo {
    create(data: IAnalytic): Promise<IAnalyticsDoc>
    uniqueClicks(shortUrl_id: string): Promise<number>
    findShortUrl(alias: string): Promise<ShortUrlDoc | null>
    clicksByDate(shortUrl_Id: string): Promise<{date: string, clicks:number}[]>
    osType(shortUrl_Id: string): Promise<any[]>
    deviceType(shortUrl_Id: string): Promise<any[]>
}