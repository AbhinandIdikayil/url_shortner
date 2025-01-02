import { Response } from "express";

export const success = (
    res: Response,
    {
        message = 'REQUEST_COMPLETED_SUCCESSFULLY',
        data = {},
        status = 200
    }: {
        message: string,
        data: any,
        status?: number
    }
) => {
    return res.status(status).json({
        success: true,
        message,
        data,
    });
};