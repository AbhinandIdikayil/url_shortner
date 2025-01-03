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
    uniqueClicks(shortUrl_Id: string | string[]): Promise<number>
    findShortUrl(alias: string): Promise<ShortUrlDoc | null>
    clicksByDate(shortUrl_Id?: string | string[], last_day?: number): Promise<{ date: string, clicks: number }[]>
    osType(shortUrl_Id?: string, userId?: string): Promise<any[]>
    deviceType(shortUrl_Id?: string, userId?: string): Promise<any[]>
    findShortUrlByTopic(topic: string): Promise<ShortUrlDoc[] | []>
    totalClicksBasedOnTopicOrUser(topic?: string, userId?: string): Promise<any[] | null>
    findUrlsCreatedByUser(userId: string): Promise<ShortUrlDoc[] | []>
    clicksByDateOfUserUrls(userId: string): Promise<any[]>
}