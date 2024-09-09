import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";
import { ResponseHandler } from "../utils/responseHandler";
import dataSource from "../config/ormconfig";
import { Users } from "../entities/Users";

export class UserController {
  
  private userService: UserService;
  
  constructor() {
    const userRepository = dataSource.getRepository(Users);
    this.userService = new UserService(userRepository)
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.getAllUsers();
      if (users.length === 0) {
        return ResponseHandler.sendSuccessResponse(res, users, "No users found.", 200)
      }
      ResponseHandler.sendSuccessResponse(res, users, "Users fetched successfully.");
    } catch (error) {
      next(error); // Pasar el error al middleware de errores
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body;
      const newUser = await this.userService.createUser(userData);
      return ResponseHandler.sendSuccessResponse(res, newUser, "User created successfully", 201);

    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.id);
      const user = await this.userService.getUserByPK(userId);

      if(!user) {
        return ResponseHandler.sendErrorResponse(res, { message: "User not found." }, 404 )
      }
      return ResponseHandler.sendSuccessResponse(res, user, "User fetched succesfully.", 200)
    } catch (error) {
      next(error)
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.id);
      const updates = req.body;
      const updatedUser = await this.userService.updateUser(userId, updates);

      if(!updatedUser) {
        return ResponseHandler.sendErrorResponse(res, { message: "User not found." }, 404)
      }
      ResponseHandler.sendSuccessResponse(res, updatedUser, "User updated succesfully.")
    } catch (error) {
      next(error);
    }
  }
  
}
