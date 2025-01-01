import { Request } from "express";


export interface AuthenticatedRequest extends Request {
    user?: { id: string }; // You can adjust this based on your token structure
}