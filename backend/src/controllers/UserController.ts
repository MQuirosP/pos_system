import { UserCreateDTO, UserResponseDTO } from "./../dtos/user.dto";
import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";
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
        return res.success(users, "No users found.", 200);
      }
      const userResponseDTOs = users.map((user) => new UserResponseDTO(user));

      const responseMessage =
        userResponseDTOs.length === 0
          ? "No users found."
          : "Users fetched succesfully.";

      return res.success(userResponseDTOs, responseMessage);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const user_id = parseInt(req.params.id);
      const user = await this.userService.getUserByPK(user_id);

      if (!user) {
        return res.error({ message: "User not found." }, 404);
      }
      const userResponseDTO = new UserResponseDTO(user);
      return res.success(userResponseDTO, "User fetched successfully.", 200);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      // Crear DTO directamente con req.body
      const userData = new UserCreateDTO(req.body);

      await userData.validate();

      const newUser = await this.userService.createUser(userData);

      if (!newUser) {
        throw new AppError("Failed to create user.", 500);
      }

      const userResponseDTO = new UserResponseDTO(newUser);

      return res.success(userResponseDTO, "User created successfully.", 201);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user_id = parseInt(req.params.id);
      const updates = req.body;
      const updated_user = await this.userService.updateUser(user_id, updates);

      if (!updated_user) {
        return res.error({ message: "User not found." }, 404);
      }
      const userResponseDTO = new UserResponseDTO(updated_user);
      return res.success(userResponseDTO, "User updated sucessfully.");
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user_id = parseInt(req.params.id);
      const user_to_delete = await this.userService.getUserByPK(user_id)

      if (!user_to_delete) {
        return res.error({ message: "User not found."}, 404);
      }

      const delete_result = await this.userService.deleteUser(user_id);

      if (!delete_result || delete_result.affected === 0) {
        return res.error({ message: "Failed to delete user." }, 500);
      }

      const userResponseDTO = new UserResponseDTO(user_to_delete)
      return res.success(userResponseDTO, "User deleted successfully.", 200);
    } catch (error) {
      next(error);
    }
  }
}
