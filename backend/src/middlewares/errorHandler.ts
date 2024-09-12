// src/middlewares/errorHandler.ts
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

// Middleware para manejar errores globales
export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Manejo de errores de análisis JSON
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      status: "fail",
      message: "Invalid JSON format in request body.",
      statusCode: err.statusCode,
    });
  }

  // Configura el código de estado y el mensaje de error
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Manejo de errores controlados por el usuario (AppError)
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      statusCode: err.statusCode,
    });
  }

  // Manejo de errores inesperados
  console.error("Unexpected error:", err);
  return res.status(500).json({
    status: "error",
    message: "Something went wrong. Please try again later.",
    statusCode: err.statusCode,
  });
};
