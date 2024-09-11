// se enfoca en manejar errores no controlados o excepciones más graves

import { json } from "body-parser";
import { error } from "console";

// extiende la clase Error para agregar información adicional
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
export const globalErrorHandler = (err: any, req: any, res: any, next: any) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err.isOperational) {
    // Errores controlados por el usuario
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Errores inesperados
    console.error('Unexpected error:', err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong. Please try again later.",
    });
  }
};
