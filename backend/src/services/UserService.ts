// src/services/UserService.ts
import { Users } from "../entities/Users";
import dataSource  from "../config/ormconfig"; // Asegúrate de importar dataSource correctamente
import { User } from "../database/models/User";

export class UserService {
  private userRepository = dataSource.getRepository(Users);

  constructor(){}

  async getAllUsers() {
    return await this.userRepository.find();
  }

  async createUser(userData: User) {
    const newUser =  this.userRepository.create(userData);
    return await this.userRepository.save(newUser);
  }
}
