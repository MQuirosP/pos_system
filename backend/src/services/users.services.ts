import { Users } from "@entities/users.entity";
import dataSource from "@config/ormconfig";
import { Repository, EntityManager } from "typeorm";
import { AppError } from "@middlewares/errorHandler";
import { UserCreateDTO, UserUpdateDTO } from "@dtos/users.dto";
import { HashingService } from "@services/hashService";
import { handleDatabaseError } from "@middlewares/databaseErrorHandler";

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
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async fetchUserByPk(userId: number): Promise<Users> {
    try {
      const user = await this.userRepository.findOne({
        where: { user_id: userId },
      });
      if (!user) throw new AppError("User not found.", 404);
      return user;
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async updateUser(
    userId: number,
    updates: Partial<UserUpdateDTO>
  ): Promise<Users> {
    try {
      const user = await this.userRepository.findOne({
        where: { user_id: userId },
      });

      if (!user) throw new AppError("User not found.", 404);

      if (updates.password) {
        try {
          const hashingPassword = await this.hashPassword(updates.password);
          updates.password = hashingPassword;
        } catch (error) {
          throw handleDatabaseError(error);
        }
      }

      Object.assign(user, updates);

      return await this.userRepository.save(user);
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async deleteUser(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });

    if (!user) throw new AppError("User not found.", 404);
    try {
      await this.userRepository.delete(userId);
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async comparePassword(userId: number, password: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });
    if (!user) throw new AppError("User not found.", 404);
    try {
      const isMatch = await this.hashingService.comparePassword(
        password,
        user.password
      );
      if ( !isMatch ) throw new AppError("Password doesn't match.", 400);
      return isMatch;
      
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }
}
