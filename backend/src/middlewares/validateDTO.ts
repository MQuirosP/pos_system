import { validateOrReject } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { AppError } from "./errorHandler";

export const validateDTO = (DTOClass: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // const expectedKeys = DTOClass.expectedKeys;
            const receivedKeys = Object.keys(req.body)

            DTOClass.validateKeys(receivedKeys)

            const dto = new DTOClass(req.body);
            await validateOrReject(dto);
            req.body = dto;
            next();
        } catch (error) {
            next(new AppError("Validation error, some properties doesn't exist.", 400))
        }
    }
}