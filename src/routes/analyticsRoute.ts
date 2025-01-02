import { Router } from 'express'
import { AnalyticsRepo } from '../repository/analyticsRepo'
import { AnalyticsService } from '../services/analyticsService';
import { AnalyticsController } from '../controllers/AnalyticsController';

export const analyticsRouter = Router()

const analyticsRepo = new AnalyticsRepo();
const analyticsService = new AnalyticsService(analyticsRepo);
const analyticsController = new AnalyticsController(analyticsService)

export {
    analyticsService
}