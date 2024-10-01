import { Users } from './../database/entities/users.entity';
import dataSource from "../config/ormconfig";
import { Repository, EntityManager, DeleteResult } from "typeorm";
import { AppError } from "../middlewares/errorHandler";
import { UserCreateDTO, UserUpdateDTO } from "../dtos/users.dto";
import { HashingService } from "./HashService";
import { handleDatabaseError } from "../middlewares/databaseErrorHandler";

export class UserService {
  private userRepository: Repository<Users>;
  private hashingService: HashingService;

  constructor(userRepository: Repository<Users>) {
    this.userRepository = userRepository;
    this.hashingService = new HashingService();
  }

  private async hashPassword(password: string): Promise<string> {
    const hashedPassword = await this.hashingService.hashPassword(password);
    if (!hashedPassword) {
      throw new AppError("Hashing password couldn't be processed.", 422);
    }
    return hashedPassword;
  }

  async createUser(userData: UserCreateDTO): Promise<Users> {
    userData.password = await this.hashPassword(userData.password);

    try {
      return await dataSource.manager.transaction(
        async (transactionalEntityManager: EntityManager) => {
          const newUser = transactionalEntityManager.create(Users, userData);
          return await transactionalEntityManager.save(newUser);
        }
      );
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async fetchAllUsers(): Promise<Users[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async fetchUserByPk(userId: number): Promise<Users | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { user_id: userId },
      });
      return user;
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async updateUser(
    userId: number,
    updates: Partial<UserUpdateDTO>
  ): Promise<Users | null> {
    try {
      // Obtener el usuario directamente en el método updateUser
      const user = await this.userRepository.findOne({
        where: { user_id: userId },
      });

      if (!user) {
        throw new AppError("User not found.", 404);
      }

      if (updates.password) {
        try {
          const hashingPassword = await this.hashPassword(updates.password);
          updates.password = hashingPassword;
        } catch (error) {
          throw handleDatabaseError(error);
        }
      }

      // Aplicar los cambios al usuario
      Object.assign(user, updates);

      // Guardar el usuario actualizado
      return await this.userRepository.save(user);
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async deleteUser(userId: number): Promise<DeleteResult | null> {
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    return await this.userRepository.delete(userId);
  }
}
