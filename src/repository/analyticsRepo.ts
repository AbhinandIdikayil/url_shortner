import { IAnalyticsRepo } from "../interfaces/IRepo";
import { AnalyticsModel, IAnalytic, IAnalyticsDoc } from "../model/AnalyticsModel";
import { ShortUrlDoc, ShortUrlModel } from "../model/ShortUrlModel";

export class AnalyticsRepo implements IAnalyticsRepo {
    async create(data: IAnalytic): Promise<IAnalyticsDoc> {
        return await AnalyticsModel.create(data)
    }
    async uniqueClicks(shortUrl_Id: string | string[]): Promise<number> {
        // Determine the query based on the type of shortUrl_Id
        const query = Array.isArray(shortUrl_Id)
            ? { shortUrl_Id: { $in: shortUrl_Id } }
            : { shortUrl_Id };

        return await AnalyticsModel.distinct('ipAddress', query).then((users) => users.length)
    }

    /**
     * 
     * @param alias 
     * @param topic 
     * @description
     *   pass either alias or topic
     */
    async findShortUrl(alias: string): Promise<ShortUrlDoc | null> {
        return await ShortUrlModel.findOne({ alias })
    }

    async clicksByDate(shortUrl_Id?: string | string[], last_day: number = 7): Promise<{ date: string, clicks: number }[]> {

        const date = new Date()
        date.setDate(date.getDate() - last_day)

        const query: Record<string, any> = { timestamp: { $gte: date } };
        if (Array.isArray(shortUrl_Id)) {
            query.shortUrl_Id = { $in: shortUrl_Id };
        } else if (shortUrl_Id) {
            query.shortUrl_Id = shortUrl_Id;
        }

        return await AnalyticsModel.aggregate([
            {
                $match: query
            },
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

    async osType(shortUrl_Id?: string): Promise<any[]> {
        return await AnalyticsModel.aggregate([
            {
                $match: {
                    ...(shortUrl_Id ? { shortUrl_Id } : {})
                }
            },
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

    async deviceType(shortUrl_Id?: string): Promise<any[]> {
        return await AnalyticsModel.aggregate([
            {
                $match: {
                    ...(shortUrl_Id ? { shortUrl_Id } : {})
                }
            },
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

    async findShortUrlByTopic(topic: string): Promise<ShortUrlDoc[] | []> {
        return await ShortUrlModel.find({ topic }, { alias: 1, totalClicks: 1 })
    }
    async totalClicksBasedOnTopic(topic: string): Promise<any[] | null> {
        return await ShortUrlModel.aggregate([
            { $match: { topic } },
            {
                $group: {
                    _id: null,
                    totalClicks: { $sum: "$totalClicks" }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalClicks: 1
                }
            }
        ])
    }
} 