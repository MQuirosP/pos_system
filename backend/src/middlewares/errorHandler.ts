import { ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";
import logger from "@utils/logger";

// Clase de error personalizado con información adicional
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

// Función auxiliar para obtener mensajes de error de validación
const extractValidationErrors = (errors: ValidationError[]): string => {
  return errors
    .map((error) => {
      const constraints = error.constraints || {};
      const messages = Object.values(constraints).join(", ");
      const childrenMessages = error.children
        ? extractValidationErrors(error.children)
        : "";
      return [messages, childrenMessages].filter(Boolean).join(", ");
    })
    .join(", ");
};

// Función auxiliar para generar el mensaje de error detallado
const getDetailedErrorMessage = (err: any): string => {
  if (Array.isArray(err) && err[0] instanceof ValidationError) {
    return extractValidationErrors(err);
  }
  return err.message || "Unknown error occurred";
};

// Middleware de manejo de errores global
export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const detailedMessage = getDetailedErrorMessage(err);

  logger.error({
    message: `${detailedMessage}`,
    method: req.method,
    path: req.path,
    statusCode: res.statusCode,
    clientIp: req.ip,
    headers: req.headers.host,
    requestBody: req.body,
  });

  // Manejo específico de errores de validación
  if (Array.isArray(err) && err[0] instanceof ValidationError) {
    return res.status(400).json({
      status: "fail",
      message: `Validation error: ${detailedMessage}.`,
    });
  }

  // Manejo de errores de base de datos
  if (err.message?.includes("Database error")) {
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

  // Manejo de errores de JSON inválido
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      status: "fail",
      message: "Invalid JSON format in request body.",
    });
  }

  // Manejo de errores de tamaño excesivo
  if (err.type === "entity.too.large") {
    return res.status(413).json({
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
