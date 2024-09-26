import { QueryFailedError } from "typeorm";
import { AppError } from "./errorHandler";

export function handleDatabaseError(error: any): void {
  if (error instanceof QueryFailedError) {
    const code = (error as any).code;

    switch (code) {
      case "23505":
        throw new AppError(
          `Duplicate data: entry already exists in table ${(error as any).table}`,
          409
        );
      case "23514":
        throw new AppError("Invalid data. Some fields cannot be empty.", 400);
      case "P0001":
        // Aquí capturamos el driverError
        const driverError = (error as any).driverError;
        const driverErrorMessage =
          driverError?.message || driverError || "The data cannot be modified.";
        throw new AppError(
          `Modification error: ${driverErrorMessage}`,
          500
        );
      default:
        throw new AppError("Unhandled database error: " + error.message, 500);
    }
  }

  throw new AppError(error.message, 500);
}
