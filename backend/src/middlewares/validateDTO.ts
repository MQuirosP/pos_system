import { validateOrReject, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { AppError } from "./errorHandler";

// Función para formatear errores de validación
const formatValidationErrors = (errors: ValidationError[]) =>
  errors
    .map(
      (err) =>
        `${err.property}: ${Object.values(err.constraints || {}).join(", ")}`
    )
    .join(", ");

// Middleware para validar DTO
export const validateDTO =
  (DTOClass: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validar claves recibidas
      DTOClass.validateKeys(Object.keys(req.body));

      // Validar el DTO
      const dto = new DTOClass(req.body);
      await validateOrReject(dto);
      req.body = dto;
      next();
    } catch (error) {
      if (Array.isArray(error)) {
        // Manejo de errores de validación
        const validationErrors = error as ValidationError[];
        const errorMessages = formatValidationErrors(validationErrors);
        next(
          new AppError(
            `Validation error: ${errorMessages}. Received entries: ${JSON.stringify(
              req.body
            )}`,
            400
          )
        );
      } else if (error instanceof AppError) {
        // Manejo de errores personalizados
        next(error);
      } else {
        // Manejo de otros errores
        next(
          new AppError(
            `Validation error: ${
              error instanceof Error ? error.message : "Unknown error"
            }. Received entries: ${JSON.stringify(req.body)}`,
            400
          )
        );
      }
    }
  };
