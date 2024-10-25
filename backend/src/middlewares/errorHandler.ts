import { ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

// Extendemos la clase Error para agregar información adicional
export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Función auxiliar para extraer mensajes de error
const extractValidationErrors = (errors: ValidationError[]): string => {
  return errors
    .map((error) => {
      const constraints = error.constraints || {};
      const messages = Object.values(constraints).join(", ");
      // Recursivamente procesar los errores en children
      const childrenMessages = extractValidationErrors((error as any).children);
      return [messages, childrenMessages].filter(Boolean).join(", ");
    })
    .join(", ");
};

// Middleware para manejar errores globales
export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(err.message);
  // logger.error(`${err.message} - Path: ${req.path} - Method: ${req.method}`);
  
  // Manejo de errores de validación
  if (Array.isArray(err)) {
    const validationErrors = err as ValidationError[];
    const errorMessages = extractValidationErrors(validationErrors);
    logger.warn(`Validation error: ${errorMessages} - Path: ${req.path}`);
    return res.status(400).json({
      status: "fail",
      message: `Validation error: ${errorMessages}.`,
    });
  }

  if (err.message.includes('Database error')) {
    logger.error(`Database error encountered: ${err.message}`);
    return res.status(500).json({
      status: "error",
      message: "A database error occurred.",
    });
  }

  // Manejo de errores personalizados (AppError)
  if (err instanceof AppError) {
    logger.warn(`${err.message} - Status: ${err.status}`);
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // if (err.isOperational) {
  //   logger.warn(`Operational error: ${err.message} - Status: ${err.status}`);
  //   return res.status(err.statusCode).json({
  //     status: err.status,
  //     message: err.message,
  //   });
  // }

  // Manejo de errores de análisis JSON
  if (err.type === "entity.parse.failed") {
    logger.warn(`Invalid JSON format: ${err.message} - Path: ${req.path}`);
    return res.status(400).json({
      status: "fail",
      message: "Invalid JSON format in request body.",
    });
  }

  // Manejo de errores de tamaño excesivo
  if (err.type === "entity.too.large") {
    logger.warn(`Request body too large - Path: ${req.path}`);
    return res.status(err.statusCode).json({
      status: "fail",
      message: "Request body is too large",
    });
  }

  // Manejo de errores inesperados
  logger.error(`Unexpected error: ${err.message} - Path: ${req.path}`);
  return res.status(500).json({
    status: "error",
    message: "Something went wrong. Please try again later.",
  });
};
