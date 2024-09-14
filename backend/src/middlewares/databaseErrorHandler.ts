import { QueryFailedError } from "typeorm";
import { AppError } from "./errorHandler";

export function handleDatabaseError(error: any): void {
  if (error instanceof QueryFailedError) {
    const code = (error as any).code;

    switch (code) {
      case "23505":
        throw new AppError("User already exists.", 409);
      case "23514":
        throw new AppError("Invalid data. Some fields cannot be empty.", 400);
      case "P0001":
        throw new AppError(
          `The username cannot be modified. Details: ${
            (error as any).where || ""
          }`,
          500
        );
      default:
        // Mensaje genérico para excepciones de PL/pgSQL
        throw new AppError("A database error occurred: " + error.message, 500);
    }
  }

  // Manejo de errores no específicos
  throw new AppError("An unexpected error occurred: " + error.message, 500);
}
