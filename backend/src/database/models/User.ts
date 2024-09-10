import { Entity } from "typeorm";
import { Users } from "../../entities/Users";

@Entity('users')
export class UserModel extends Users {
  
  // async updateUser(updates: Partial<UserModel>): Promise<this> {
  //   Object.assign(this, updates);
  //   await this.save();
  //   return this;
  // }
}
