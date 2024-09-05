// src/services/UserService.ts
import { Users } from "../entities/Users";
import dataSource  from "../config/ormconfig"; // Asegúrate de importar dataSource correctamente

export class UserService {
  private userRepository = dataSource.getRepository(Users);

  async getAllUsers() {
    return await this.userRepository.find();
  }
}
