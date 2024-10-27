import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { IUser } from "@interfaces/users.interface";
import { UserRole } from "@enums/custom.enums";
import { BaseFormattedEntity } from "@entities/BaseFormatedEntity";
import { HashingService } from "../../services/hashService";

@Entity("users")
export class Users extends BaseFormattedEntity implements IUser {
  @PrimaryGeneratedColumn("increment", { name: "user_id" })
  user_id!: number;

  @Column({ type: "varchar", unique: true, nullable: false })
  username!: string;

  @Column({ type: "varchar", unique: true, nullable: false })
  email!: string;

  @Column({ type: "varchar", nullable: false })
  password!: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.User })
  role!: UserRole;

  @Column({
    type: "boolean",
    default: false,
  })
  is_active!: boolean;

  @Column({ type: "varchar", nullable: false })
  name!: string;

  @Column({ type: "varchar", nullable: false })
  lastname!: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "created_at",
  })
  created_at!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "updated_at",
  })
  updated_at!: Date;

  private static hashingService = new HashingService();

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if ( this.password ) {
      this.password = await Users.hashingService.hashPassword(this.password)
    }
  }

  protected fieldsToLowerCase(): string[] {
    return ["username", "email", "name", "lastname"];
  }

  protected fieldsToCapitalize(): string[] {
    return ["name", "lastname"];
  }
}
