import { Request, Response,  NextFunction } from "express";

const requestLogger = (logger: any) => (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.info({
            message: `Request processed`,
            method: req.method,
            url: req.originalUrl,
            statusCode: res.statusCode,
            duration: `${duration}ms`,
            clientIp: req.ip,
            // userId: req.user?.id || "Anonymous"
        })
    })
    next();
}

export default requestLogger;