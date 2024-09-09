import { Users } from "../../entities/Users";
import { Entity } from "typeorm";

@Entity('users')
export class UserModel extends Users {
  
  async updateUser(updates: Partial<UserModel>): Promise<this> {
    Object.assign(this, updates);
    await this.save();
    return this;
  }
}
