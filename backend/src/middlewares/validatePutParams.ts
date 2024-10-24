import { Request, Response, NextFunction } from "express";
import { AppError } from "@middlewares/errorHandler";

export function validatePutParams(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.method === "PUT") {
    const paramsRegex = /\/\w+\/[^\/]+$/;

    if (!paramsRegex.test(req.originalUrl)) {
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
