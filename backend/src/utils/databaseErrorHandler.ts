import { QueryFailedError } from "typeorm";
import { AppError } from "./errorHandler";

export function handleDatabaseError(error: any): void {
    if(error instanceof QueryFailedError) {
        if((error as any).code === "23505") {
            throw new AppError("User already exists.", 409);
        }
    }
    throw new AppError("Error creating user.", 500)
}