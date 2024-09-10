import { UserCreateDTO, UserResponseDTO } from "./../dtos/user.dto";
import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";
import { ResponseHandler } from "../utils/responseHandler";
import dataSource from "../config/ormconfig";
import { Users } from "../entities/Users";
import { AppError } from "../utils/errorHandler";

export class UserController {
  private readonly userService: UserService;

  constructor() {
    const userRepository = dataSource.getRepository(Users);
    this.userService = new UserService(userRepository);
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.getAllUsers();
      if (users.length === 0) {
        return ResponseHandler.sendSuccessResponse(
          res,
          users,
          "No users found.",
          200
        );
      }
      const userResponseDTOs = users.map((user) => new UserResponseDTO(user));

      const responseMessage =
        userResponseDTOs.length === 0
          ? "No users found."
          : "Users fetched succesfully.";

      return ResponseHandler.sendSuccessResponse(
        res,
        userResponseDTOs,
        responseMessage
      );
    } catch (error) {
      next(error); // Pasar el error al middleware de errores
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const user_id = parseInt(req.params.id);
      const user = await this.userService.getUserByPK(user_id);

      if (!user) {
        return ResponseHandler.sendErrorResponse(
          res,
          { message: "User not found." },
          404
        );
      }
      const userResponseDTO = new UserResponseDTO(user);
      return ResponseHandler.sendSuccessResponse(
        res,
        userResponseDTO,
        "User fetched succesfully.",
        200
      );
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      // Crear DTO directamente con req.body
      const userData = new UserCreateDTO(req.body);

      await userData.validate(); // Validar el DTO

      // Crear usuario
      const newUser = await this.userService.createUser(userData);

      // Verificar si newUser no es null o undefined
      if (!newUser) {
        throw new AppError("Failed to create user.", 500);
      }

      // Crear DTO de respuesta directamente
      const userResponseDTO = new UserResponseDTO(newUser);

      // Enviar la respuesta de éxito
      return ResponseHandler.sendSuccessResponse(
        res,
        userResponseDTO,
        "User created successfully",
        201
      );
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.id);
      const updates = req.body;
      const updatedUser = await this.userService.updateUser(userId, updates);

      if (!updatedUser) {
        return ResponseHandler.sendErrorResponse(
          res,
          { message: "User not found." },
          404
        );
      }
      const userResponseDTO = new UserResponseDTO(updatedUser);
      ResponseHandler.sendSuccessResponse(
        res,
        userResponseDTO,
        "User updated succesfully."
      );
    } catch (error) {
      next(error);
    }
  }
}
