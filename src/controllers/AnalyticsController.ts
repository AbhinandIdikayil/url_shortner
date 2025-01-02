import { AnalyticsService } from "../services/analyticsService"


export class AnalyticsController {
    private service
    constructor(service: AnalyticsService) {
        this.service = service
    }
}