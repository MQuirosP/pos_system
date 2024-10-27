import { Users } from "@entities/users.entity";
import dataSource from "@config/ormconfig";
import { Repository, EntityManager, ILike } from "typeorm";
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

  private async handleDatabaseOperation<T>(operation: () => Promise<T>): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  private async findUserById(userId: number): Promise<Users> {
    const user = await this.userRepository.findOne({
      where: { user_id: userId},
    });
    if ( !user ) throw new AppError("User not found.", 404);
    return user;
  }

  async createUser(userData: Partial<Users>): Promise<Users> {
    return this.handleDatabaseOperation(async () => {
      const newUser = this.userRepository.create(userData);
      return await this.userRepository.save(newUser);
    })
  }

  async fetchAllUsers(): Promise<Users[]> {
    return this.handleDatabaseOperation(async () => {
      return await this.userRepository.find();
    })
  }

  async getUserByPK(userId: number): Promise<Users> {
    return this.handleDatabaseOperation(() => this.findUserById(userId));
  }

  async getUserByUsername(username: string): Promise<Users[]> {
    return this.handleDatabaseOperation(async () => {
      const users = await this.userRepository.find({
        where: { 
          username: ILike(`%${username}%`),
        },
      });
      return users;
    })
  }

  async updateUser(
    userId: number,
    updates: Partial<Users>
  ): Promise<Users> {
    return this.handleDatabaseOperation(async () => {
      const user = await this.findUserById(userId);
      Object.assign(user, updates);
      return await this.userRepository.save(user);
    });
  }

  async deleteUser(userId: number): Promise<void> {
    return this.handleDatabaseOperation(async () => {
      const user = await this.findUserById(userId);
      await this.userRepository.delete(user.user_id);
    })
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
