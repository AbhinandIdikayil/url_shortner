import { IAnalytics, IAnalyticsDoc } from "../model/AnalyticsModel";
import { ShortUrlDoc } from "../model/ShortUrlModel";
import { CreateUrl } from "./User";


export interface AuthAndUrlIService {
    signin(id_token: string): Promise<{ email: string, token: string, name: string }>
    createShortUrl(data: CreateUrl): Promise<{ shortUrl: string, createdAt: string }>
    redirectShortUrl(alias: string): Promise<ShortUrlDoc>
}


export interface IAnalyticsService {
    createAnalytics(data: IAnalytics): Promise<IAnalyticsDoc>
    analyticsBasedOnAlias(alias: string): Promise<any>
}