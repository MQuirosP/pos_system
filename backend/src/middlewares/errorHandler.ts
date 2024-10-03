// src/middlewares/errorHandler.ts
import { ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";

// Extiende la clase Error para agregar información adicional
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
  console.log(err);
  
  // Manejo de errores de validación
  if (Array.isArray(err)) {
    const validationErrors = err as ValidationError[];
    const errorMessages = extractValidationErrors(validationErrors);
    
    return res.status(400).json({
      status: "fail",
      message: `Validation error: ${errorMessages}.`,
    });
  }

  if (err.message.includes('Database error')) {
    return res.status(500).json({
      status: "error",
      message: "A database error occurred.",
    });
  }

  // Manejo de errores personalizados (AppError)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Manejo de errores de análisis JSON
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      status: "fail",
      message: "Invalid JSON format in request body.",
    });
  }

  // Manejo de errores de tamaño excesivo
  if (err.type === "entity.too.large") {
    return res.status(err.statusCode).json({
      status: "fail",
      message: "Request body is too large",
    });
  }

  // Manejo de errores inesperados
  return res.status(500).json({
    status: "error",
    message: "Something went wrong. Please try again later.",
  });
};
