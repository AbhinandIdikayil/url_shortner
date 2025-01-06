import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../utils/ErrorResponse";
import { success } from "../middlewares/success";
import { status_code } from "../constants/enum/status_code";
import { AuthenticatedRequest } from "../interfaces/Request";
import { analyticsEvent } from "../events";
import { Event_ENUM } from "../constants/event";
import { AuthAndUrlIService } from "../interfaces/IService";


export class AuthAndUrlController {
    private service: AuthAndUrlIService
    constructor(service: AuthAndUrlIService) {
        this.service = service
    }

    async signinAndSingup(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers.authorization; //! id_token from google auth
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                throw ErrorResponse.badRequest('_id_token is required in authorization header');
            }

            const id_token = authHeader.split(' ')[1]; // Extract token after "Bearer"
            if (!id_token) {
                throw ErrorResponse.badRequest('Invalid authorization header format');
            }
            const data = await this.service.signin(id_token);
            res.setHeader('Authorization', `Bearer ${data.token}`);
            return success(res, { message: 'Sucessfull', data, status: status_code.CREATED })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(400).json({ message: 'Token is required' });
            }
            res.setHeader('Authorization', `Bearer`);
            return success(res, { message: 'Sucessfull', data: '', status: status_code.OK, })
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token or session expired' });
        }
    }


    async createShortUrlController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const { longUrl, customAlias: alias, topic } = req.body
            if (!longUrl) throw ErrorResponse.badRequest('longUrl is required')
            if (!req.user?.id) {
                throw ErrorResponse.badRequest('Not authorized')
            }
            const data = await this.service.createShortUrl({ longUrl, userId: req.user?.id, alias, topic });
            return success(res, { message: 'ShortUrl created successfully', data })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }


    async redirectShortUrlController(req: Request, res: Response, next: NextFunction) {
        try {
            const { alias } = req.params
            if (!alias) {
                throw ErrorResponse.badRequest('params-> alias is required')
            }
            const data = await this.service.redirectShortUrl(alias)
            /**
             * @pass_these_datas_as_params_to_event_emitter
             * userAgent: string,
             * ipAddress: string,
             * shortUrl_id: Types.ObjectId,
             * timestamp: Date
             * userId
             */
            const params = {
                shortUrl_id: data._id,
                userAgent: req.headers['user-agent'],
                ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                timestamp: new Date(),
                userId:data.userId
            }

            analyticsEvent.emit(Event_ENUM.CLICK_URL,params);

            
            return res.redirect(data.longUrl)
        } catch (error) {
            next(error)
        }
    }

} 