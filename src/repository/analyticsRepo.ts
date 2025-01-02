import { IAnalyticsRepo } from "../interfaces/IRepo";
import { AnalyticsModel, IAnalytic, IAnalyticsDoc } from "../model/AnalyticsModel";

export class AnalyticsRepo implements IAnalyticsRepo {
    async create(data: IAnalytic): Promise<IAnalyticsDoc> {
        return await AnalyticsModel.create(data)
    }
}