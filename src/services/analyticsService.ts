import { IAnalyticsService } from "../interfaces/IService";
import { IAnalytics, IAnalyticsDoc } from "../model/AnalyticsModel";
import { AnalyticsRepo } from "../repository/analyticsRepo";
import { UAParser } from 'ua-parser-js'


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
        const analytics =  this.repository.create({
            userAgent: data.userAgent,
            os,
            device,
            ipAddress: data.ipAddress,
            shortUrl_Id: data.shortUrl_id,
            userId:data.userId
        })
        return analytics
    }
}