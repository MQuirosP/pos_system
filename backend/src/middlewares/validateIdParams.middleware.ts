import { Request, Response, NextFunction } from "express";
import { AppError } from "@middlewares/errorHandler.middleware";
import logger from "@utils/logger";

export function validateIdInUrl(
  paramName: string = "id",
  methods: string[] = ["PUT", "DELETE", "GET", "PATCH"]
) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (methods.includes(req.method.toUpperCase())) {
      const rawId = req.params[paramName];
      const id = Number(rawId);

      if (!rawId || isNaN(id) || id <= 0 || !Number.isInteger(id)) {
        logger.error({
          message: `Request rejected: missing or invalid identifier '${paramName}' in the URL path for ${req.method} method.`,
          // method: req.method,
          url: req.originalUrl,
          statusCode: res.statusCode,
          // clientIp: req.ip,
          // userId: req.user?.id || "Anonymous"
        });

        return next(
          new AppError(
            `A valid identifier '${paramName}' is required in the URL for ${req.method} requests.`,
            400
          )
        );
      }

      // Para que el controller use el parametro parseado
      // Esto es útil si el controlador espera un número en lugar de una cadena
      (req as any)[paramName] = id;
    }

    next();
  };
}
