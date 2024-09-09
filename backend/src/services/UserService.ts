import { Users } from "../entities/Users";
import dataSource  from "../config/ormconfig"; 
import { User } from "../database/models/User";
import { Repository, EntityManager, QueryFailedError } from "typeorm";
import { AppError } from '../utils/errorHandler';

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

  async createUser(userData: User): Promise<Users> {
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
}
