import { IAnalyticsService } from "../interfaces/IService";
import { IAnalytics, IAnalyticsDoc } from "../model/AnalyticsModel";
import { AnalyticsRepo } from "../repository/analyticsRepo";
import { UAParser } from 'ua-parser-js'
import ErrorResponse from "../utils/ErrorResponse";
import { url } from "inspector";


export class AnalyticsService implements IAnalyticsService {
    private repository: AnalyticsRepo
    constructor(repo: AnalyticsRepo) {
        this.repository = repo
        console.log(this.repository.create)
    }
    async createAnalytics(data: IAnalytics): Promise<IAnalyticsDoc> {
        console.log(data);
        const userAgent = new UAParser(data.userAgent);
        const os = userAgent.getOS().name || 'Unknown' as string
        const device = userAgent.getDevice().type || 'desktop' as string
        console.log(this.repository)
        const analytics = this.repository.create({
            userAgent: data.userAgent,
            os,
            device,
            ipAddress: data.ipAddress,
            shortUrl_Id: data.shortUrl_id,
            userId: data.userId
        })
        return analytics
    }
    async analyticsBasedOnAlias(alias: string): Promise<any> {
        const shortUrl_id = await this.repository.findShortUrl(alias);
        if (!shortUrl_id) throw ErrorResponse.badRequest('Alias not found');
        const id = shortUrl_id._id as string
        const totalClicks = shortUrl_id.totalClicks;
        const uniqueUsers: number = await this.repository.uniqueClicks(id);
        const clicksByDate = await this.repository.clicksByDate(id)
        const osType = await this.repository.osType(id)
        const deviceType = await this.repository.deviceType(id)
        return {
            totalClicks,
            uniqueUsers,
            clicksByDate,
            osType,
            deviceType
        }
    }





    async analyticsBasedOnTopic(topic: string): Promise<any> {
        const urlWithClickCount = await this.repository.findShortUrlByTopic(topic);
        const totalClicks = await this.repository.totalClicksBasedOnTopic(topic);
        const shortUrl_id: string[] = urlWithClickCount.map(url => url._id as string)

        const uniqueUsers = await this.repository.uniqueClicks(shortUrl_id)
        const clicksByDate = await this.repository.clicksByDate(shortUrl_id)
        const urls = await this.addUniqueUsersToUrls(urlWithClickCount)
        return {
            totalClicks:totalClicks?.[0]?.totalClicks,
            uniqueUsers,
            clicksByDate,
            urls
        }
    }

    async addUniqueUsersToUrls(url: any[]): Promise<any[]> {
        const urls = Promise.all(
            url?.map(async (obj) => {
                const uniqueUsers = await this.repository.uniqueClicks(obj._id as string)
                return {
                    ...obj._doc,
                    uniqueUsers
                };
            })
        )
        return urls;
    }
}
