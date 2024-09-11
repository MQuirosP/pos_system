import { Users } from "../entities/Users";
import dataSource from "../config/ormconfig";
import { Repository, EntityManager, DeleteResult } from "typeorm";
import { AppError } from "../utils/errorHandler";
import { UserModel } from "../database/models/User";
import { UserCreateDTO } from "../dtos/user.dto";
import { HashingService } from "./HashService";
import { handleDatabaseError } from "../utils/databaseErrorHandler";

export class UserService {
  private userRepository: Repository<Users>;
  private hashingService: HashingService;

  constructor(userRepository: Repository<Users>) {
    this.userRepository = userRepository;
    this.hashingService = new HashingService();
  }

  async getAllUsers(): Promise<Users[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new AppError("Error fetching users.", 500);
    }
  }
  
  async getUserByPK(userId: number): Promise<Users | null> {
    const user = await this.userRepository.findOne({
      where: {user_id: userId}
    });
    return user;
  }

  async createUser(userData: UserCreateDTO): Promise<Users | undefined> {
  // Verifica si la contraseña está presente
  if (!userData.password) {
    throw new AppError("Password is required", 400);
  }

  try {
    // Hashea la contraseña
    userData.password = await this.hashPassword(userData.password);
  } catch (error) {
    throw new AppError("Error hashing password", 500);
  }

  const entityManager = dataSource.manager;

  try {
    // Ejecuta la transacción para crear el usuario
    return await entityManager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const newUser = transactionalEntityManager.create(Users, userData);
        return await transactionalEntityManager.save(newUser);
      }
    );
  } catch (error) {
    handleDatabaseError(error);
  }
}

private async hashPassword(password: string): Promise<string> {
  const hashedPassword = await this.hashingService.hashPassword(password);
  if (!hashedPassword) {
    throw new AppError("Hashing password couldn't be processed.", 422);
  }
  return hashedPassword;
}

  async updateUser(
    userId: number,
    updates: Partial<UserModel>
  ): Promise<UserModel | null> {
    // Obtener el usuario directamente en el método updateUser
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });

    if (!user) {
      return null;
    }

    // Aplicar los cambios al usuario
    Object.assign(user, updates);

    // Guardar el usuario actualizado
    return await this.userRepository.save(user);
  }

  async deleteUser(userId: number): Promise<DeleteResult | null> {
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });
    if(!user) {
      return null;
    }

    return await this.userRepository.delete(userId)
  }
}
