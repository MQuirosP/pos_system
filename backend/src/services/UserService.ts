import { Users } from "../entities/Users";
import dataSource  from "../config/ormconfig"; 
import { Repository, EntityManager, QueryFailedError } from "typeorm";
import { AppError } from '../utils/errorHandler';
import { UserModel } from "../database/models/User";

export class UserService {
  private userRepository: Repository<Users>;

  constructor(userRepository: Repository<Users>){
    this.userRepository = userRepository;
  }

  async getAllUsers(): Promise<Users[]> {
    try {
      return await this.userRepository.find();
      
    } catch (error) {
      throw new AppError("Error fetching users.", 500)
    }
  }

  async createUser(userData: Users): Promise<Users> {
    const entityManager = dataSource.manager;
    try {
      return await entityManager.transaction(async (transactionalEntityManager: EntityManager) => {
        const newUser = transactionalEntityManager.create(Users, userData);
        return await transactionalEntityManager.save(newUser);
      });
    } catch (error) {
      if (error instanceof QueryFailedError) {
        // Usar `error as any` para acceder al `code`
        if ((error as any).code === '23505') {
          // Maneja la violación de restricción única
          throw new AppError("User already exists.", 409);
        }
      }
      throw new AppError("Error creating user.", 500);
    }
  }

  async getUserByPK(userId: number): Promise<Users | null> {
    const user = await this.userRepository.findOne({
      where: { userId },
    })
    return user;
  }

  async updateUser(userId: number, updates: Partial<UserModel>): Promise<UserModel | null> {
    const user = await this.getUserByPK(userId)
    if (!user) {
      return null;
    }
    const userModel = new UserModel();
    Object.assign(userModel, user);
    return await userModel.updateUser(updates);
  }
}
