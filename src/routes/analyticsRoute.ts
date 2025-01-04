import { Router } from 'express'
import { AnalyticsRepo } from '../repository/analyticsRepo'
import { AnalyticsService } from '../services/analyticsService';
import { AnalyticsController } from '../controllers/AnalyticsController';
import { auth } from '../middlewares/auth';

export const analyticsRouter = Router()

const analyticsRepo = new AnalyticsRepo();
const analyticsService = new AnalyticsService(analyticsRepo);
const analyticsController = new AnalyticsController(analyticsService)


/**
* @swagger
* /api/analytics/overall:
*   post:
*     summary: Get URL Analytics
*     description: Retrieve detailed analytics for a specific short URL, providing insights into its performance, including total clicks and unique audience interactions.
*     tags:
*       - Analytics
*     responses:
*       200:
*         description: Successful operation
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: Successful
*                 data:
*                   type: object
*                   properties:
*                     totalUrls:
*                       type: integer
*                       example: 10
*                     totalClicks:
*                       type: integer
*                       example: 10
*                     uniqueUsers:
*                       type: integer
*                       example: 5
*                     clicksByDate:
*                       type: array
*                       items:
*                         type: object
*                         properties:
*                           date:
*                             type: string
*                             format: date
*                             example: "2025-01-01"
*                           clicks:
*                             type: integer
*                             example: 2
*                     osType:
*                       type: array
*                       items:
*                         type: object
*                         properties:
*                           osName:
*                             type: string
*                             example: "windows"
*                           uniqueClicks:
*                             type: integer
*                             example: 15
*                           uniqueUsers:
*                             type: integer
*                             example: 5
*                     deviceType:
*                       type: array
*                       items:
*                         type: object
*                         properties:
*                           deviceName:
*                             type: string
*                             example: "desktop"
*                           uniqueClicks:
*                             type: integer
*                             example: 10
*                           uniqueUsers:
*                             type: integer
*                             example: 10
*/

analyticsRouter.route('/overall')
    .get(auth, analyticsController.overallAnalyticsControlelr.bind(analyticsController))

/**
* @swagger
* /api/analytics/{alias}:
*    post:
*      summary: Get URL Analytics
*      description: Retrieve detailed analytics for a specific short URL, providing insights into its performance, including total clicks and unique audience interactions.
*      tags:
*       - Analytics
*      parameters:
*       - in: path
*         name: alias
*         required: true
*         schema:
*           type: string
*         description: The unique alias of the short URL.
*         example: "tpjKuqb9"
*      requestBody:
*          required: false
*      responses:
*       200:
*         description: Successful operation
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: Successful
*                 data: 
*                   type: object
*                   properties:
*                     totalClicks:
*                       type: integer
*                       example: 10
*                     uniqueUsers:
*                       type: integer
*                       example: 5
*                     clicksByDate:
*                       type: array
*                       items:
*                         type: object
*                         properties:
*                           date:
*                             type: string
*                             format: date
*                             example: "2025-01-01"
*                           count:
*                             type: integer
*                             example: 2
*                     osType:
*                       type: array
*                       items:
*                         type: object
*                         properties:
*                           osName:
*                             type: string
*                             example: "windows"
*                           uniqueClicks:
*                             type: integer
*                             example: 15
*                           uniqueUsers:
*                             type: integer
*                             example: 5
*                     deviceType:
*                       type: array
*                       items:
*                         type: object
*                         properties:
*                           deviceName:
*                             type: string
*                             example: "desktop"
*                           uniqueClicks:
*                             type: integer
*                             example: 10
*                           uniqueUsers:
*                             type: integer
*                             example: 10
*                 status:
*                   type: string
*                   example: CREATED
*/
analyticsRouter.route('/:alias')
    .get(analyticsController.aliasBasedAnalyticsController.bind(analyticsController))



/**
* @swagger
* /api/analytics/topic/{topic}:
*    post:
*      summary: Get URL Analytics
*      description: Retrieve detailed analytics for a specific short URL, providing insights into its performance, including total clicks and unique audience interactions.
*      tags:
*       - Analytics
*      parameters:
*       - in: path
*         name: topic
*         required: true
*         schema:
*           type: string
*         description: The unique alias of the short URL.
*         example: "other"
*      requestBody:
*          required: false
*      responses:
*       200:
*         description: Successful operation
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: Successful
*                 data: 
*                   type: object
*                   properties:
*                     totalClicks:
*                       type: integer
*                       example: 10
*                     uniqueUsers:
*                       type: integer
*                       example: 5
*                     clicksByDate:
*                       type: array
*                       items:
*                         type: object
*                         properties:
*                           date:
*                             type: string
*                             format: date
*                             example: "2025-01-01"
*                           clicks:
*                             type: integer
*                             example: 2
*                     urls:
*                       type: array
*                       items:
*                         type: object
*                         properties:
*                           _id:
*                             type: string
*                             example: "67763a91e5686ed3a2869e3a"
*                           totalClisk:
*                             type: integer
*                             example: 10
*                           uniqueUsers:
*                             type: integer
*                             example: 1
*                           url:
*                             type: string
*                             example: "http://localhost:3000/api/shorten/tpjKuqb9"
*/
analyticsRouter.route('/topic/:topic')
    .get(analyticsController.topicBasedAnalyticsController.bind(analyticsController));



export {
    analyticsService
}