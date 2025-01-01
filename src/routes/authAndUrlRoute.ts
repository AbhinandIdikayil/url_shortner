import { Router } from 'express'
import { AuthAndUrlService } from '../services/authAndUrlService'
import { AuthAndUrlRepo } from '../repository/authAndUrlRepo'
import { AuthAndUrlController } from '../controllers/AuthAndUrlContoller'

export const authAndUrlRoute = Router()

const authAndUrlRepo = new AuthAndUrlRepo()
const authAndUrlService = new AuthAndUrlService(authAndUrlRepo);
const authAndUrlController = new AuthAndUrlController(authAndUrlService)


/**
    * @swagger
    * /api/google/signup:
    *   post:
    *     summary: Sign in or sign up using an id_token
    *     description: Endpoint for user sign-in or sign-up using an authorization token.
    *     tags: [Authorization]
    *     requestBody:
    *       required: false
    *     responses:
    *       201:
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
    *                   example: { email: "example@gmail.com", name: "name", token: "abcd1234" }
    *                 status:
    *                   type: string
    *                   example: CREATED
    *       400:
    *         description: Bad Request
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 error:
    *                   type: string
    *                   message: Token is required
    */
authAndUrlRoute.route('/google/signup').post(authAndUrlController.signinAndSingup.bind(authAndUrlController))


/**
    * @swagger
    * /api/logout:
    *   post:
    *     summary: logout user
    *     description: Endpoint for user logout.
    *     tags: [Authorization]
    *     requestBody:
    *       required: false
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
    *                 data: ""
    *                 status:
    *                   type: string
    *                   example: CREATED
    */
authAndUrlRoute.route('/logout').post(authAndUrlController.logout.bind(authAndUrlController))


/**
    * @swagger
    * /api/shorten:
    *   post:
    *     summary: Creating a new short URL 
    *     description: Endpoint for creating short url to facilitate easy sharing of long URLs.
    *     tags: [Authorization]
    *     requestBody:
    *       required: false
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               alias:
    *                 type: string
    *                 description: Custom alias for the shortened URL.
    *                 example: mywebsite
    *               url:
    *                 type: string
    *                 description: The original long URL to be shortened.
    *                 example: https://example.com/very-long-url
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
    *                 data: ""
    *                 status:
    *                   type: string
    *                   example: CREATED
    */
authAndUrlRoute.route('/shorten').post(authAndUrlController.logout.bind(authAndUrlController))

authAndUrlRoute.route('/shorten/:alias').post(authAndUrlController.logout.bind(authAndUrlController))

