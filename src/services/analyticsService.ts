import { IAnalyticsService } from "../interfaces/IService";
import { IAnalytics, IAnalyticsDoc } from "../model/AnalyticsModel";
import { AnalyticsRepo } from "../repository/analyticsRepo";
import { UAParser } from 'ua-parser-js'
import ErrorResponse from "../utils/ErrorResponse";


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

}