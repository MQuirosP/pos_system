import { QueryFailedError } from "typeorm";
import { AppError } from "./errorHandler";

export function handleDatabaseError(error: any): void {
  console.log(error);
  if (error instanceof QueryFailedError) {
    const code = (error as any).code;

    switch (code) {
      case "23505":
        throw new AppError(
          `Duplicate data: entry already exists in table ${
            (error as any).table
          }: ${(error as any).detail}`,
          409
        );
      case "23514":
        throw new AppError("Invalid data. Some fields cannot be empty.", 400);
      case "P0001":
        // Aquí capturamos el driverError
        const driverError = (error as any).driverError;
        const driverErrorMessage =
          driverError?.message || driverError || "The data cannot be modified.";
        throw new AppError(`Modification error: ${driverErrorMessage}`, 500);
      case "23502":
        throw new AppError(`Some fields were not found: ${(error as any).column}`, 400);
      case "23503":
        throw new AppError(`Some values were not found: ${(error as any).detail}`, 400)
      default:
        throw new AppError("Unhandled database error: " + error.message, 500);
    }
  }

  throw new AppError(error.message, error.statusCode);
}
