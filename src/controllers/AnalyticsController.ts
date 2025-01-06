import { NextFunction, Request, Response } from "express"
import ErrorResponse from "../utils/ErrorResponse"
import { success } from "../middlewares/success"
import { AuthenticatedRequest } from "../interfaces/Request"
import { IAnalyticsService } from "../interfaces/IService"


export class AnalyticsController {
    private service: IAnalyticsService
    constructor(service: IAnalyticsService) {
        this.service = service
    }
    async aliasBasedAnalyticsController(req: Request, res: Response, next: NextFunction) {
        try {
            const { alias } = req.params
            if (!alias) throw ErrorResponse.badRequest('alias is missing in params');
            const data = await this.service.analyticsBasedOnAlias(alias as string)
            return success(res, { message: 'Successfull', data })
        } catch (error) {
            next(error)
        }
    }

    async topicBasedAnalyticsController(req: Request, res: Response, next: NextFunction) {
        try {
            const { topic } = req.params
            if (!topic) throw ErrorResponse.badRequest('topic is missing in params')
            const data = await this.service.analyticsBasedOnTopic(topic);
            return success(res, { data, message: 'Succesfull' })
        } catch (error) {
            next(error)
        }
    }

    async overallAnalyticsControlelr(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const id = req.user?.id
            if (!id) {
                throw ErrorResponse.unauthorized('Not authorized')
            }
            const data = await this.service.overAllAnalytics(id);
            return success(res, { data, message: 'Successfull' })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}