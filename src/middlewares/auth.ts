import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../utils/ErrorResponse";
import { verify } from "../utils/verify_token";
import { AuthenticatedRequest } from "../interfaces/Request";
import { TokenExpiredError } from 'jsonwebtoken'; // Assuming you are using the 'jsonwebtoken' package


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
    } catch (error: unknown) {
        if (error instanceof TokenExpiredError) {
            next(ErrorResponse.unauthorized(`Token expired at ${error.expiredAt}`));
        } else if (error instanceof Error) {
            next(ErrorResponse.unauthorized(error.message));
        } else {
            next(ErrorResponse.unauthorized('An unknown error occurred'));
        }
    }
}