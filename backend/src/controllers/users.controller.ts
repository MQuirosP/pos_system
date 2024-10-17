import { UserCreateDTO, UserResponseDTO, UserUpdateDTO } from "@dtos/users.dto";
import { Request, Response, NextFunction } from "express";
import { UserService } from "@services/users.services";
import dataSource from "@config/ormconfig";
import { Users } from "@entities/users.entity";

export class UserController {
  private readonly userService: UserService;

  constructor() {
    const userRepository = dataSource.getRepository(Users);
    this.userService = new UserService(userRepository);
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    const userData = new UserCreateDTO(req.body);
    await userData.validate();
    try {
      const newUser = await this.userService.createUser(userData);

      return res.success(
        new UserResponseDTO(newUser),
        "User created successfully.",
        201
      );
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.fetchAllUsers();
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
      const user = await this.userService.fetchUserByPk(userId);

      return res.success(
        new UserResponseDTO(user),
        "User fetched successfully.",
        200
      );
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    const userId = parseInt(req.params.id);
    const userUpdateDTO = new UserUpdateDTO(req.body);

    await userUpdateDTO.validate();
    try {
      const updatedUser = await this.userService.updateUser(
        userId,
        userUpdateDTO
      );

      return res.success(
        new UserResponseDTO(updatedUser),
        "User updated sucessfully."
      );
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    const userId = parseInt(req.params.id);
    try {
      await this.userService.deleteUser(userId);

      return res.success({}, "User deleted successfully.", 200);
    } catch (error) {
      next(error);
    }
  }

  async comparePassword(req: Request, res: Response, next: NextFunction) {
    const userId = parseInt(req.params.id);
    const password = req.body.password;
    try {
      await this.userService.comparePassword(userId, password);

      return res.success({ user_id: userId }, "Password is correct.", 200);
    } catch (error) {
      next(error);
    }
  }
}
