import { Users } from "../entities/Users";
import dataSource from "../config/ormconfig";
import { Repository, EntityManager, QueryFailedError, DeleteResult } from "typeorm";
import { AppError } from "../utils/errorHandler";
import { UserModel } from "../database/models/User";
import { UserCreateDTO } from "../dtos/user.dto";

export class UserService {
  private userRepository: Repository<Users>;

  constructor(userRepository: Repository<Users>) {
    this.userRepository = userRepository;
  }

  async getAllUsers(): Promise<Users[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new AppError("Error fetching users.", 500);
    }
  }

  async createUser(userData: UserCreateDTO): Promise<Users> {
    const entityManager = dataSource.manager;
    try {
      return await entityManager.transaction(
        async (transactionalEntityManager: EntityManager) => {
          const newUser = transactionalEntityManager.create(Users, userData);
          return await transactionalEntityManager.save(newUser);
        }
      );
    } catch (error) {
      if (error instanceof QueryFailedError) {
        // Usar `error as any` para acceder al `code`
        if ((error as any).code === "23505") {
          // Maneja la violación de restricción única
          throw new AppError("User already exists.", 409);
        }
      }
      throw new AppError("Error creating user.", 500);
    }
  }

  async getUserByPK(user_id: number): Promise<Users | null> {
    const user = await this.userRepository.findOne({
      where: {user_id}
    });
    return user;
  }

  async updateUser(
    user_id: number,
    updates: Partial<UserModel>
  ): Promise<UserModel | null> {
    // Obtener el usuario directamente en el método updateUser
    const user = await this.userRepository.findOne({
      where: { user_id },
    });

    if (!user) {
      return null;
    }

    // Aplicar los cambios al usuario
    Object.assign(user, updates);

    // Guardar el usuario actualizado
    return await this.userRepository.save(user);
  }

  async deleteUser(user_id: number): Promise<DeleteResult | null> {
    const user = await this.userRepository.findOne({
      where: { user_id },
    });
    if(!user) {
      return null;
    }

    return await this.userRepository.delete(user_id)
  }

}
