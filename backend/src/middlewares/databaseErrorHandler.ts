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
          }`,
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
        const nullFieldsError = (error as any).driverError; // Renombrado aquí
        const nullFieldsMessage =
          nullFieldsError?.message ||
          nullFieldsError ||
          "Fields cannot be empty.";
        throw new AppError(`Some null fields found: ${nullFieldsMessage}`, 400);
      default:
        throw new AppError("Unhandled database error: " + error.message, 500);
    }
  }

  throw new AppError(error.message, error.statusCode);
}
