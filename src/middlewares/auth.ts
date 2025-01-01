import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../utils/ErrorResponse";
import { verify } from "../utils/verify_token";
import { AuthenticatedRequest } from "../interfaces/Request";

export const auth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const header = req.headers.authorization
        if (!header || !header.startsWith('Bearer')) {
            throw ErrorResponse.unauthorized('Token is not provided')
        }
        const token = header.split(' ')[1]
        if (!token) {
            throw ErrorResponse.unauthorized('Invalid authorization header format');
        }
        const decoded = verify(token);
        if (decoded) {
            req.user = { id: decoded.id };
            next();
        } else {
            throw ErrorResponse.unauthorized('Invalid token');
        }
    } catch (error) {
        next(error)
    }
}