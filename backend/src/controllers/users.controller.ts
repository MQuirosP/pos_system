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

  private async handleControllerOperation(
    req: Request,
    res: Response,
    next: NextFunction,
    operation: () => Promise<any>
  ) {
    try {
      await operation();
    } catch (error) {
      next(error);
    }
  }

  createUser(req: Request, res: Response, next: NextFunction) {
    this.handleControllerOperation(req, res, next, async () => {
      const userData = new UserCreateDTO(req.body);
      await userData.validate();
      const newUser = await this.userService.createUser(userData);

      return res.success(
        new UserResponseDTO(newUser),
        "User created successfully.",
        201
      );
    });
  }

  getUsers(req: Request, res: Response, next: NextFunction) {
    this.handleControllerOperation(req, res, next, async () => {
      const { name } = req.query;
      let users: Users[] = [];

      if ( name && typeof name === "string" && name.trim() !== "" ) {
        users = await this.userService.getUserByUsername(name);
      } else {
        users = await this.userService.fetchAllUsers();
      }

      const userResponseDTOs = users.map(
        (user) => new UserResponseDTO(user)
      );
      const responseMessage = userResponseDTOs.length === 0
        ? "No users found."
        : "All users fetched successfully.";
      
      return res.success(userResponseDTOs, responseMessage, 200);
    })
  }

  getUserById(req: Request, res: Response, next: NextFunction) {
    this.handleControllerOperation(req, res, next, async () => {
      const userId = parseInt(req.params.id);
      const user = await this.userService.getUserByPK(userId);

      return res.success(
        new UserResponseDTO(user),
        "User fetched successfully.",
        200
      );
    });
  }

  updateUser(req: Request, res: Response, next: NextFunction) {
    this.handleControllerOperation(req, res, next, async () => {
      const userId = parseInt(req.params.id);
      const userUpdateDTO = new UserUpdateDTO(req.body);

      await userUpdateDTO.validate();
      const updatedUser = await this.userService.updateUser(userId, userUpdateDTO);

      return res.success(
        new UserResponseDTO(updatedUser),
        "User updated successfully."
      )
    })
  }

  deleteUser(req: Request, res: Response, next: NextFunction) {
    this.handleControllerOperation(req, res, next, async () => {
      const userId = parseInt(req.params.id);
      const userToDelete = await this.userService.getUserByPK(userId);
      await this.userService.deleteUser(userId);

      return res.success(
        new UserResponseDTO(userToDelete),
        "User deleted successfully.",
        200
      )
    })
  }

  async comparePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.id);
      const password = req.body.password;
      await this.userService.comparePassword(userId, password);

      return res.success({ user_id: userId }, "Password is correct.", 200);
    } catch (error) {
      next(error);
    }
  }
}
