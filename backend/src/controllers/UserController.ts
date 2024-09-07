// src/controllers/UserController.ts
import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";
import { ResponseHandler } from "../utils/responseHandler";

export class UserController {
  private userService = new UserService();

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.getAllUsers();
      if (users.length === 0) {
        return ResponseHandler.sendSuccessResponse(res, users, "No users found.", 200)
      }
      return ResponseHandler.sendSuccessResponse(res, users, "Users fetched successfully.");
    } catch (error) {
      next(error); // Pasar el error al middleware de errores
    }
  }
}
