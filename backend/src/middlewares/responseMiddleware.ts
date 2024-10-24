import { Request, Response, NextFunction } from "express";

declare global {
    namespace Express {
        interface Response {
            success(data: any, message?: string, statusCode?: number): void;
            error(error: any, statusCode?: number): void;
        }
    }
}

export const responseMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.success = (data: any, message: string = 'Request successful.', statusCode: number = 200) => {
        if (!res.headersSent){
            res.status(statusCode).json({
                success: true,
                message,
                data,
            });
        }
    }

    res.error = (error: any, statusCode: number = 500) => {
        if (!res.headersSent) {
            res.status(statusCode).json({
                success: false,
                message: error.message || "Internal server error.",
            });
        }
    }

    next();
}