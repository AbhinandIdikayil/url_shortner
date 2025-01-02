import { Router } from 'express'
import { AuthAndUrlService } from '../services/authAndUrlService'
import { AuthAndUrlRepo } from '../repository/authAndUrlRepo'
import { AuthAndUrlController } from '../controllers/AuthAndUrlContoller'
import { auth } from '../middlewares/auth'

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
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               longUrl:
    *                 type: string 
    *                 description: The original URL to be shortened.
    *                 example: https://abhinand.urlshortner.com
    *               customAlias:
    *                 type: string | optional
    *                 description:  A custom alias for the short URL (if not provided, generate a unique one).
    *                 example: mywebsite
    *               topic:
    *                 type: string | optional
    *                 description:  A category under which the short URL is grouped
    *                 example: acquisition, activation, retention
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
    *                   example: {shortUrl: "", createdAt: "2025-01-01T07:05:24.061+00:00"}
    *                 status:
    *                   type: string
    *                   example: CREATED
    */
authAndUrlRoute.route('/shorten')
    .post(auth, authAndUrlController.createShortUrlController.bind(authAndUrlController))


/**
* @swagger
* /api/shorten/{alias}:
*    post:
*      summary: Redirect short url 
*      description: Redirect to the original URL based on the short URL alias, enabling seamless access to the long URL while tracking user engagement.
*      tags:
*       - Redirect
*      parameters:
*       - in: path
*         name: alias
*         required: true
*         schema:
*           type: string
*         description: The unique alias of the short URL.
*         example: "my-custom-alias"
*      requestBody:
*          required: false
*      responses:
*       302:
*         description: Redirects the user to the original long URL.
*         headers:
*           Location:
*             description: The original long URL to which the user is redirected.
*             schema:
*               type: string

*/

authAndUrlRoute.route('/shorten/:alias').get(authAndUrlController.redirectShortUrlController.bind(authAndUrlController))
