import { NextFunction, Request, Response } from "express";
import { AuthAndUrlService } from "../services/authAndUrlService";
import ErrorResponse from "../utils/ErrorResponse";
import { success } from "../middlewares/success";
import { status_code } from "../constants/enum/status_code";


export class AuthAndUrlController {
    private service: AuthAndUrlService
    constructor(service: AuthAndUrlService) {
        this.service = service
    }

    async signinAndSingup(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers.authorization; //! id_token from google auth
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                throw ErrorResponse.badRequest('_id_token is required');
            }

            const id_token = authHeader.split(' ')[1]; // Extract token after "Bearer"
            if (!id_token) {
                throw ErrorResponse.badRequest('Invalid authorization header format');
            }
            const data = await this.service.signin(id_token);
            res.setHeader('Authorization', `Bearer ${data.token}`);
            return success(res, { message: 'Sucessfull', data, status: status_code.CREATED })
        } catch (error) {
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

}