import { Request, Response, NextFunction } from "express";
import { AppError } from "@middlewares/errorHandler";
import logger from "@utils/logger";

export function validatePutParams(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.method === "PUT") {
    const paramsRegex = /\/\w+\/\d+$/;

    if (!paramsRegex.test(req.originalUrl)) {
      logger.error({
        message: `Request rejected: missing or invalid identifier in the URL path for PUT method.`,
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        clientIp: req.ip,
        // userId: req.user?.id || "Anonymous"
      });
      return next(
        new AppError(
          "A valid identifier is required in the URL for PUT requests.",
          400
        )
      );
    }
  }
  next();
}
