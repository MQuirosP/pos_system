import { validateOrReject } from "class-validator";
import { Request, Response, NextFunction } from "express";

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
      // Pasamos el error al manejador de errores global
      next(error);
    }
  };
