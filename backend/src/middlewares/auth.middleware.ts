import { Request, Response, NextFunction } from "express";
import { JwtService } from "@services/jwt.services";
import { AppError } from "./errorHandler.middleware";

const jwtService = new JwtService();

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) throw new AppError("No valid token was provided.", 400);

        const userData = await jwtService.verifyAccessToken(token);
        ( req as any).user = userData;
        next();
    } catch (error) {
        next(error);
    }
}