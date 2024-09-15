import {
  UserCreateDTO,
  UserResponseDTO,
  UserUpdateDTO,
} from "../dtos/users.dto";
import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";
import dataSource from "../config/ormconfig";
import { Users } from "../entities/users.entity";
import { error } from "console";

export class UserController {
  private readonly userService: UserService;

  constructor() {
    const userRepository = dataSource.getRepository(Users);
    this.userService = new UserService(userRepository);
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = new UserCreateDTO(req.body);
      await userData.validate();
      const newUser = await this.userService.createUser(userData);

      const userResponseDTO = new UserResponseDTO(newUser!);

      return res.success(userResponseDTO, "User created successfully.", 201);
    } catch (error) {
      next(error);
    }
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

      return res.success(userResponseDTOs, responseMessage, 200);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.id);
      const user = await this.userService.getUserByPK(userId);

      if (!user) {
        return res.error({ message: "User not found." }, 404);
      }
      const userResponseDTO = new UserResponseDTO(user);
      return res.success(userResponseDTO, "User fetched successfully.", 200);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.id);
      const userUpdateDTO = new UserUpdateDTO(req.body);

      await userUpdateDTO.validate();
      const updatedUser = await this.userService.updateUser(
        userId,
        userUpdateDTO
      );

      if (!updatedUser) {
        // return res.error({ message: "User not found." }, 404);
        next(error);
      }
      const userResponseDTO = new UserResponseDTO(updatedUser!);
      return res.success(userResponseDTO, "User updated sucessfully.");
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.id);
      const userToDelete = await this.userService.getUserByPK(userId);

      if (!userToDelete) {
        return res.error({ message: "User not found." }, 404);
      }

      const deleteResult = await this.userService.deleteUser(userId);

      if (!deleteResult || deleteResult.affected === 0) {
        return res.error({ message: "Failed to delete user." }, 500);
      }

      const userResponseDTO = new UserResponseDTO(userToDelete);
      return res.success(userResponseDTO, "User deleted successfully.", 200);
    } catch (error) {
      next(error);
    }
  }
}
