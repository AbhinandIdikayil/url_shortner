import { NextFunction, Request, Response } from "express"
import { AnalyticsService } from "../services/analyticsService"
import ErrorResponse from "../utils/ErrorResponse"
import { success } from "../middlewares/success"


export class AnalyticsController {
    private service: AnalyticsService
    constructor(service: AnalyticsService) {
        this.service = service
    }
    async aliasBasedAnalyticsController(req: Request, res: Response, next: NextFunction) {
        try {
            const { alias } = req.params
            if(!alias) throw ErrorResponse.badRequest('alias is not provided');
            const data = await this.service.analyticsBasedOnAlias(alias)
            return success(res,{message:'Successfull',data})
        } catch (error) {
            next(error)
        }
    }
}