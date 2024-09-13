import { QueryFailedError } from "typeorm";
import { AppError } from "./errorHandler";

export function handleDatabaseError(error: any): void {
  if (error instanceof QueryFailedError) {
    if ((error as any).code === "23505") {
      throw new AppError("User already exists.", 409);
    }
    if ((error as any).code === "23514") {
      throw new AppError("Invalid data. Some fields cannot be empty.", 400);
    }
  }
  throw new AppError(error, 500);
}
