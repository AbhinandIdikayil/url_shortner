import { IAnalyticsRepo } from "../interfaces/IRepo";
import { AnalyticsModel, IAnalytic, IAnalyticsDoc } from "../model/AnalyticsModel";
import { ShortUrlDoc, ShortUrlModel } from "../model/ShortUrlModel";

export class AnalyticsRepo implements IAnalyticsRepo {
    async create(data: IAnalytic): Promise<IAnalyticsDoc> {
        return await AnalyticsModel.create(data)
    }
    async uniqueClicks(shortUrl_Id: string): Promise<number> {
        return await AnalyticsModel.distinct('ipAddress', { shortUrl_Id }).then((users) => users.length)
    }
    async findShortUrl(alias: string): Promise<ShortUrlDoc | null> {
        return await ShortUrlModel.findOne({ alias })
    }
    async clicksByDate(shortUrl_Id: string, last_day: number = 7): Promise<{ date: string, clicks: number }[]> {
        const date = new Date()
        // default last day will be 7
        date.setDate(date.getDate() - last_day)
        return await AnalyticsModel.aggregate([
            { $match: { shortUrl_Id, timestamp: { $gte: date } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%d-%m-%Y", date: '$timestamp' } },
                    clicks: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            },
            {
                $project: { date: '$_id', clicks: 1, _id: 0 }
            }
        ])
    }

    async osType(shortUrl_Id: string): Promise<any[]> {
        return await AnalyticsModel.aggregate([
            { $match: { shortUrl_Id } },
            {
                $group: {
                    _id: '$os',
                    uniqueClicks: { $sum: 1 },
                    uniqueUsers: { $addToSet: '$ipAddress' }
                }
            },
            {
                $project: {
                    osName: '$_id',
                    uniqueClicks: 1,
                    uniqueUsers: { $size: '$uniqueUsers' },
                    _id: 0
                }
            }
        ])
    }

    async deviceType(shortUrl_Id: string): Promise<any[]> {
        return await AnalyticsModel.aggregate([
            { $match: { shortUrl_Id } },
            {
                $group: {
                    _id: '$device',
                    uniqueClicks: { $sum: 1 },
                    uniqueUsers: { $addToSet: '$ipAddress' }
                }
            },
            {
                $project: {
                    deviceName: '$_id',
                    uniqueClicks: 1,
                    uniqueUsers: { $size: '$uniqueUsers' },
                    _id: 0
                }
            }
        ])
    }
} 