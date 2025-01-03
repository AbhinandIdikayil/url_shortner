import mongoose from "mongoose";
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
            ? { shortUrl_Id: [...shortUrl_Id] }
            : { shortUrl_Id };
        console.log(query)
        const data = await AnalyticsModel.distinct('ipAddress', query).then((users) => {
            console.log(users)
            return users.length
        })
        console.log(data)
        return data
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

    async osType(shortUrl_Id?: string, userId?: string): Promise<any[]> {
        return await AnalyticsModel.aggregate([
            {
                $match: {
                    ...(shortUrl_Id ? { shortUrl_Id } : {}),
                    ...(userId ? { userId } : {})
                }
            },
            {
                $group: {
                    _id: '$os',
                    uniqueClicks: { $addToSet: { $concat: ['$ipAddress', '_', { $toString: '$shortUrl_Id' }] } },
                    uniqueUsers: { $addToSet: '$ipAddress' }
                }
            },
            {
                $project: {
                    osName: '$_id',
                    uniqueClicks: { $size: '$uniqueClicks' },
                    uniqueUsers: { $size: '$uniqueUsers' },
                    _id: 0
                }
            }
        ])
    }

    async deviceType(shortUrl_Id?: string, userId?: string): Promise<any[]> {
        return await AnalyticsModel.aggregate([
            {
                $match: {
                    ...(shortUrl_Id ? { shortUrl_Id } : {}),
                    ...(userId ? { userId } : {}),

                }
            },
            {
                $group: {
                    _id: '$device',
                    uniqueClicks: { $addToSet: { $concat: ['$ipAddress', '_', { $toString: '$shortUrl_Id' }] } },
                    uniqueUsers: { $addToSet: '$ipAddress' }
                }
            },
            {
                $project: {
                    deviceName: '$_id',
                    uniqueClicks: {$size:'$uniqueClicks'},
                    uniqueUsers: { $size: '$uniqueUsers' },
                    _id: 0
                }
            }
        ])
    }

    async findShortUrlByTopic(topic: string): Promise<ShortUrlDoc[] | []> {
        return await ShortUrlModel.find({ topic }, { alias: 1, totalClicks: 1 })
    }
    async totalClicksBasedOnTopicOrUser(topic?: string, userId?: string): Promise<any[] | null> {
        return await ShortUrlModel.aggregate([
            {
                $match: {
                    ...(topic ? { topic } : {}),
                    ...(userId ? { userId: new mongoose.Types.ObjectId(userId) } : {}),
                }
            },
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

    async findUrlsCreatedByUser(userId: string): Promise<ShortUrlDoc[] | []> {
        return await ShortUrlModel.find({ userId })
    }
    async clicksByDateOfUserUrls(userId: string): Promise<any[]> {
        return await AnalyticsModel.aggregate([
            {
                $match: { userId: new mongoose.Types.ObjectId(userId) }
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
} 